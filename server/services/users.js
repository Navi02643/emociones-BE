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
    text: `
    Te damos la bienvenida ${user.fullName}, tus datos de acceso son:
    correo: ${user.email}
    contraseña: ${password}
    Se te recomienda cambiar tu contraseña una vez ingreses a la pagina`,
  };
  transporter.sendMail(mailOptions);
  return 0;
}

function checkUserData(user) {
  try {
    if (user.name === "") return { isValid: false, message: 'the name is required', data: [] };
    if (user.middleName === "") return { isValid: false, message: 'the middleName is required', data: [] };
    if (user.email === "") return { isValid: false, message: 'the email is required', data: [] };
    if (user.phone === "") return { isValid: false, message: 'the phone is required', data: [] };
    if (user.birthdate === "") return { isValid: false, message: 'the birthday is required', data: [] };
    if (user.idRecord === "") return { isValid: false, message: 'the record is required', data: [] };
    return true;
  } catch (error) {
    return { isValid: false, message: 'the name, middleName, email, phone and record is obligatory', data: [] };
  }
}

async function generateUser(user) {
  const check = checkUserData(user);

  if (check.isValid === false) return check;

  const userData = user;
  const findEmail = await userDB.findEmail(user.email);

  if (findEmail) return { isValid: false, message: 'Email already exists', data: user.email };

  const password = await generatePassword();
  const passwordEncrypted = await bcrypt.hash(password, 10);
  userData.password = passwordEncrypted;
  const userSave = await userDB.saveUser(userData);
  const dataUserFilter = userDTO.filterUser(userSave);

  sendEmail(dataUserFilter, password);

  return { isValid: true, message: 'User successfully created', data: dataUserFilter };
}

module.exports = { generateUser };
