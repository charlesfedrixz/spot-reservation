import nodemailer from "nodemailer";

const createOTPEmailTemplate = (otp) => {
  return `
    Dear User,

    Your verification code is: ${otp}

    This code will expire in 10 minutes.
    Please do not share this code with anyone.

    If you didn't request this code, please ignore this email.

    Best regards,
    Spot Reservation Team
  `;
};

const sendEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Spot Reservation" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Verification Code",
    text: createOTPEmailTemplate(otp),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Spot Reservation</h2>
        <p>Your one-time verification code:</p>
        <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
        <p><strong>Please do not share this code with anyone.</strong></p>
        <p>If you didn't request this, please change your password or contact Spot Reservation Team Support.</p>
        <br>
        <p>Best regards,<br>Spot Reservation Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
