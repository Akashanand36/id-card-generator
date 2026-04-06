const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const { generateHTML } = require("./template");
const { sendEmail } = require("./mailer");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ ID Card Backend is Running");
});

// ✅ Generate ID API
app.post("/generate-id", async (req, res) => {
  let browser;

  try {
    const data = req.body;
    console.log("📥 Incoming Data:", data);

    // ✅ Fix Google Drive image URL
    if (data.photo && data.photo.includes("drive")) {
      data.photo = data.photo.replace("open?id=", "uc?export=view&id=");
    }

    // ✅ Launch Puppeteer (Render compatible)
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });

    const page = await browser.newPage();

    // ✅ Set size (ID Card ratio)
    await page.setViewport({ width: 400, height: 600 });

    // ✅ Generate HTML
    const html = generateHTML(data);

    await page.setContent(html, {
      waitUntil: "networkidle0"
    });

    // ✅ Take screenshot
    const imageBuffer = await page.screenshot({
      type: "png"
    });

    // ✅ OPTION 1: Send Email (uncomment after testing)
    // await sendEmail(data.email, imageBuffer);

    // ✅ OPTION 2: Return Image directly (BEST FOR TESTING)
    res.set({
      "Content-Type": "image/png"
    });

    return res.send(imageBuffer);

    // ✅ OPTION 3 (alternative JSON response)
    /*
    return res.json({
      success: true,
      message: "✅ ID Card Generated Successfully"
    });
    */

  } catch (error) {
    console.error("❌ FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "❌ Error generating ID Card",
      error: error.message
    });

  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// ✅ Port (Render requirement)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
