require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (subject, html, recieverEmail) => {
  const message = {
    to: recieverEmail,
    from: {
      name: "IIITL Placement Cell",
      email: process.env.ADMIN_EMAIL,
    },
    subject,
    html,
  };

  sgMail
    .send(message)
    .then((response) => console.log("Email send"))
    .catch((error) => console.log("Error sending email: ", error));
};

module.exports = sendEmail;
