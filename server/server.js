const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const { generateHTML } = require("./template");
const { sendEmail } = require("./mailer");
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Server Running");
});

// ✅ GET test route
app.get("/generate-id", (req, res) => {
  res.send("⚠️ Use POST request");
});

// ✅ MAIN API
app.post("/generate-id", async (req, res) => {
  let browser;

  try {
    const data = req.body;
    console.log("📥 Data:", data);

    // ✅ Fix Google Drive image link
    if (data.photo && data.photo.includes("drive")) {
      data.photo = data.photo.replace("open?id=", "uc?export=view&id=");
    }

    // ✅ Launch browser
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });

    const page = await browser.newPage();
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

    // ✅ SEND EMAIL (DON'T BLOCK RESPONSE)
    if (data.email) {
      sendEmail(data.email, imageBuffer)
        .then(() => console.log("📧 Email sent"))
        .catch(err => console.error("❌ Email error:", err));
    }

    // ✅ RETURN IMAGE (for Apps Script Drive save)
    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename=${data.id || "id-card"}.png`
    });

    return res.send(imageBuffer);

  } catch (err) {
    console.error("❌ Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error generating ID",
      error: err.message
    });

  } finally {
    if (browser) await browser.close();
  }
});

// ✅ Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
