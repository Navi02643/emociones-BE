const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const userDB = require("../database/users");
const tokenDB = require("../database/tokens");
const recordDB = require("../database/records");
const userDTO = require('./models/userDTO');
const RANGE = require("../utils/range.constans");

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

async function generateUser(user) {
  const userData = user;

  if (!user.cause) return { isValid: false, message: 'It is necessary to open a file, please send the cause', data: null };

  const generateRecord = await recordDB.saveRecord({ cause: user.cause });

  userData.idRecord = generateRecord._id;

  const check = userDTO.checkUserData(user);

  if (check.isValid === false) return check;

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

async function nameAutoComplete(user, token) {
  const { idUser } = await tokenDB.findToken(token);
  const loggerUser = await userDB.findById(idUser);

  if (loggerUser.range === RANGE.patient) return { isValid: false, message: 'User range not valid, access only for therapists', data: null };

  const data = { name: user.name };
  if (data.name.length >= 3) {
    const userData = await userDB.findPatient(data);
    return { isValid: true, message: 'List of users obtained successfully', data: userData };
  }
  return { isValid: false, message: 'List of users not found', data: null };
}

module.exports = { generateUser, nameAutoComplete };
