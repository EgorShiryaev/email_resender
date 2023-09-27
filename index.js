const express = require("express");
const http = require("http");
const MailSender = require("./mail_sender");

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mailSender = MailSender.init();
const port = 80;

app.post("/sendMail", async (req, res) => {
  const { recipient, subject, body } = req.body;
  console.log(req.body)
  try {
    await mailSender.send({
      to: recipient,
      subject: subject,
      text: body,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Success start server ${port}`);
});
