const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const userDB = require("../database/users");
const userDTO = require('./models/userDTO');

async function generatePassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i += 1) {
    password += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return password;
}

async function sendEmail(user, password) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Confirmacion de registro',
    text: `Te damos la bienvenida ${user.fullName}, tus datos de acceso son:
    correo: ${user.email}
    contraseña: ${password}
    Se te recomienda cambiar tu contraseña una vez ingreses a la pagina`,
  };
  transporter.sendMail(mailOptions);
  return 0;
}

async function generateUser(user) {
  const userData = user;
  const findEmail = await userDB.findEmail(user.email);
  if (findEmail) return 'Email already exists';
  const password = await generatePassword();
  const passwordEncrypted = await bcrypt.hash(password, 10);
  userData.password = passwordEncrypted;
  const userSave = await userDB.saveUser(userData);
  const dataUserFilter = userDTO.filterUser(userSave);
  sendEmail(dataUserFilter, password);
  return dataUserFilter;
}

module.exports = { generateUser };
