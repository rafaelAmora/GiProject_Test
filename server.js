const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "rmoreira2209@gmail.com",
    pass: "wgwu gidg ufkc oanz",
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, date } = req.body;

  let hi = date < 12 ? "Bom dia" : date < 18 ? "Boa tarde" : "Boa noite";

  transport
    .sendMail({
      from: `${name} <${email}>`,
      to: email,
      subject: "Controle e acesso dos Eventuais",
      html: `<p>${hi}, tudo bem?</p>
    <p>Seguem os dados para acesso ao controle de presença dos eventuais da Gi Group:</p>
    <p><a href="https://eventuais.gigroup.com.br/admin">https://eventuais.gigroup.com.br/admin</a></p>
    <p>E-mail: <a href="mailto:moniquesaline@gmail.com">moniquesaline@gmail.com</a></p>
    <p>Senha: sO&lt;2?5cnM</p>
    <p>Atenciosamente,</p>`,
      text: "Olá dev, tudo bem?",
    })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error("Erro ao enviar e-mail:", err);
      res.status(500).json({ success: false, error: err.message });
    });
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
