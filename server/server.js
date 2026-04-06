const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const { generateHTML } = require("./template");
const { sendEmail } = require("./mailer");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route (to avoid "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ ID Card Backend is Running");
});


// ✅ Generate ID API
app.post("/generate-id", async (req, res) => {
  let browser;

  try {
    const data = req.body;

    // ✅ Fix Google Drive image link
    if (data.photo && data.photo.includes("drive")) {
      data.photo = data.photo.replace("open?id=", "uc?export=view&id=");
    }

    // ✅ Launch Puppeteer (IMPORTANT for Render)
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    // ✅ Generate HTML
    const html = generateHTML(data);

    await page.setContent(html, {
      waitUntil: "networkidle0"
    });

    // ✅ Take Screenshot (ID Card)
    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: false
    });

    // ✅ Send Email with attachment
    await sendEmail(data.email, imageBuffer);

    res.status(200).json({
      success: true,
      message: "✅ ID Card Sent Successfully"
    });

  } catch (error) {
    console.error("❌ Error:", error);

    res.status(500).json({
      success: false,
      message: "❌ Error generating ID Card"
    });

  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// ✅ Use dynamic port (REQUIRED for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
