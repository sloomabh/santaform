const nodemailer = require("nodemailer");

const sendEmail = async (pendingRequests) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS
    }
  });

  const mailOptions = {
    from: '"Do Not Reply" <do_not_reply@northpole.com>',
    to: 'santa@northpole.com',
    subject: 'Pending Requests',
    text: pendingRequests.map(request => (
      `Child Username: ${request.username}\n` +
      `Child Address: ${request.address}\n` +
      `Request: ${request.wish}\n\n`
    )).join('')
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
