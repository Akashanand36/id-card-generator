const { Resend } = require("resend");

// ✅ Use environment variable (DON’T hardcode API key)
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (to, imageBuffer) => {
  try {
    // ✅ Convert image buffer → base64
    const base64Image = imageBuffer.toString("base64");

    const response = await resend.emails.send({
      from: "akashanand3615@gmail.com", // change after domain verify
      to: to,
      subject: "Your ID Card",
      html: `
        <div style="font-family: Arial; text-align: center;">
          <h2>Your ID Card</h2>
          <p>Please find your ID card attached below.</p>
        </div>
      `,
      attachments: [
        {
          filename: "id-card.png",
          content: base64Image
        }
      ]
    });

    console.log("✅ Email sent:", response);

  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
};
