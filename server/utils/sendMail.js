const nodemailer = require('nodemailer');

module.exports = function sendMail({
  serverHost,
  serverPort,
  serverSecure,
  serverUser,
  serverPassword,
  from,
  to,
  subject,
  text,
}) {
  const transporter = nodemailer.createTransport({
    host: serverHost,
    port: serverPort,
    secure: serverSecure,
    auth: {
      user: serverUser,
      pass: serverPassword,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      console.log('Sent message info', info);
      resolve(info);
    });
  });
};
