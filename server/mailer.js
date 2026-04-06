const nodemailer = require("nodemailer");

exports.sendEmail = async (to, image) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your@gmail.com",
      pass: "your-app-password"
    }
  });

  await transporter.sendMail({
    from: "your@gmail.com",
    to: to,
    subject: "Your ID Card",
    text: "Your ID card is attached.",
    attachments: [
      {
        filename: "id-card.png",
        content: image
      }
    ]
  });
};
