const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (to, name) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // 👈 MUY IMPORTANTE (Mailtrap no usa SSL directo)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // 👈 clave en entornos locales/VM
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Bienvenid@ a FilmApp",
    html: `
      <h2>Hola ${name} 👋</h2>
      <p>Gracias por registrarte en <strong>FilmApp</strong>.</p>
    `,
  });
};

module.exports = {
  sendWelcomeEmail,
};
