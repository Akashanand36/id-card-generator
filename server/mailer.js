const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (to, imageBuffer) => {
  try {
    const base64Image = imageBuffer.toString("base64");

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // ✅ MUST use this
      to: "akashanand3615@gmail.com",
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
