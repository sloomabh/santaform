const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sendEmail = async (pendingRequests) => {
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    // Render email content using EJS template
    const emailTemplatePath = path.join(
      __dirname,
      "../views/emailTemplate.ejs"
    );
    const emailContent = await ejs.renderFile(emailTemplatePath, {
      pendingRequests,
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Santa\'s Helper" <do_not_reply@northpole.com>',
      to: "santa@northpole.com",
      subject: "Pending Requests for Santa",
      html: emailContent,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
