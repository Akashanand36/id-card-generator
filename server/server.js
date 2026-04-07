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
  res.send("✅ Server Running");
});

// ✅ Fix: allow browser + POST testing
app.get("/generate-id", (req, res) => {
  res.send("⚠️ Use POST request to generate ID");
});

// ✅ Main API
app.post("/generate-id", async (req, res) => {
  let browser;

  try {
    const data = req.body;
    console.log("📥 Data:", data);

    // Fix Google Drive image
    if (data.photo && data.photo.includes("drive")) {
      data.photo = data.photo.replace("open?id=", "uc?export=view&id=");
    }

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 400, height: 600 });

    const html = generateHTML(data);

    await page.setContent(html, {
      waitUntil: "networkidle0"
    });

    const imageBuffer = await page.screenshot({ type: "png" });

    // ✅ OPTION A: Return image (best for testing)
    res.set({ "Content-Type": "image/png" });
    return res.send(imageBuffer);

    // ✅ OPTION B: Send email (enable later)
    // await sendEmail(data.email, imageBuffer);
    // return res.json({ success: true });

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

// ✅ Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));
