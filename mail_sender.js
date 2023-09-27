const nodemailer = require("nodemailer");

const resenderEmail = process.env.RESENDER_EMAIL;

var transporter;

const MailSender = () => {
  const init = () => {
    if (!transporter) {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: resenderEmail,
          pass: process.env.RESENDER_EMAIL_PASSWORD,
        },
      });
    }
  };

  /**
   * send email
   * @param {Object} config email message config
   * @param {String} config.to to email
   * @param {String} config.subject subject of mail
   * @param {String} config.text text of mail
   */
  const send = (config) => {
    const mailOptions = {
      from: resenderEmail,
      to: config.to,
      subject: config.subject,
      text: config.text,
    };
    return new Promise((resolve, reject) => {
      try {
        init();
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            reject(error);
          } else {
            resolve();
            console.log("Email sent: " + info.response);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    send,
  };
};

exports.init = () => MailSender();
