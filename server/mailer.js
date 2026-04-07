const nodemailer = require("nodemailer");

const sendEmail = async (to, imageBuffer) => {
  try {
    console.log("📧 Sending email to:", to);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"NRS ID Card" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Your ID Card",
      html: `
        <div style="text-align:center;font-family:Arial">
          <h2>Your ID Card</h2>
          <p>Please find your ID card attached.</p>
        </div>
      `,
      attachments: [
        {
          filename: "id-card.png",
          content: imageBuffer
        }
      ]
    };

    const response = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", response.messageId);

    return response;

  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
