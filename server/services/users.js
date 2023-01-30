const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const userDB = require("../database/users");
const tokenDB = require("../database/tokens");
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

  const findEmail = await userDB.findEmail(user.email);

  if (findEmail) return { isValid: false, message: 'Email already exists', data: user.email };

  const password = await generatePassword();
  const passwordEncrypted = await bcrypt.hash(password, 10);
  userData.password = passwordEncrypted;
  const userSave = await userDB.saveUser(userData);
  const dataUserFilter = userDTO.filterUser(userSave);

  sendEmail(dataUserFilter, password);

  return dataUserFilter;
}

async function createPatient(data, token) {
  const user = data;
  user.range = RANGE.patient;
  const check = userDTO.checkPatientData(user);
  if (!check.isValid) return check;
  const { idUser } = await tokenDB.findToken(token);
  const userData = await generateUser(user);
  if (userData.isValid === false) return userData;
  await userDB.addPatient(idUser, userData.id);

  return { isValid: true, message: 'Patient successfully created', data: userData };
}

async function createTherapist(data) {
  const user = data;
  const check = userDTO.checkUserData(user);
  if (!check.isValid) return check;
  const userData = await generateUser(user);
  if (userData.isValid === false) return userData;
  return { isValid: true, message: 'Therapist successfully created', data: userData };
}

async function nameAutoComplete(user, token) {
  const { idUser } = await tokenDB.findToken(token);
  const loggerUser = await userDB.findById(idUser);

  if (loggerUser.range === RANGE.patient) return { isValid: false, message: 'User range not valid, access only for therapists', data: null };

  const data = { name: user.name };
  if (data.name === undefined) {
    return { isValid: false, message: 'Enter the name parameter', data: null };
  }
  if (data.name.length >= 3) {
    const userData = await userDB.findPatient(data);
    return { isValid: true, message: 'List of users obtained successfully', data: userData };
  }
  if (!data.name) {
    return { isValid: false, message: 'Enter the name parameter with its value', data: null };
  }
  return { isValid: false, message: 'List of users not found', data: null };
}

async function autoName(token) {
  const { idUser } = await tokenDB.findToken(token);
  const loggerUser = await userDB.findById(idUser);

  if (loggerUser.range === RANGE.patient) return { isValid: false, message: 'User range not valid, access only for therapists', data: null };
  const dataNames = await userDB.findPatientsN();
  const dataUserFilter = userDTO.filterUsers(dataNames);

  return { isValid: true, message: 'List of users obtained successfully', data: dataUserFilter };
}

async function getPatients(query, token) {
  const page = query.page === "" ? 1 : query.page;
  const size = query.size === "" ? 10 : query.size;
  const way = query.way === "" ? 1 : query.way;
  const data = ({
    page,
    size,
    way,
  });

  const filteredData = userDTO.inputGetPatients(data);
  if (filteredData.isValid === false) return filteredData;
  filteredData.value.page = parseInt(filteredData.value.page, 10);
  filteredData.value.size = parseInt(filteredData.value.size, 10);
  filteredData.value.way = parseInt(filteredData.value.way, 10);
  const offset = (filteredData.value.page * filteredData.value.size) - filteredData.value.size;
  const { idUser } = await tokenDB.findToken(token);
  const user = await userDB.findPatientsByTherapist(idUser, filteredData, offset);
  const filteredUser = userDTO.outputGetPatients(user);
  return ({ isValid: true, message: "Patients found successfully", data: filteredUser });
}

async function deleteTherapist(therapist, token) {
  const { idUser } = await tokenDB.findToken(token);
  const loggerUser = await userDB.findById(idUser);

  if (loggerUser.range === RANGE.patient) return { isValid: false, message: 'This user rank cannot delete therapist', data: null };
  if (loggerUser.range === RANGE.therapist) return { isValid: false, message: 'This user rank cannot delete therapist', data: null };

  const data = { _id: therapist._id };
  const userData = await userDB.deleteTherapist(data);

  if (!userData) {
    return { isValid: false, message: 'Therapist not found', data: null };
  }
  return { isValid: true, message: 'Therapist successfully removed', data: userData };
}

async function findUser(user) {
  const pagesSize = user.pagesSize === "" ? 1 : user.pagesSize;
  const pagesNumber = user.pagesNumber === "" ? 1 : user.pagesNumber;
  const data = ({
    pagesSize,
    pagesNumber,
  });
  const userData = await userDB.findUsers(data);
  const userDataDto = userDTO.filterUsers(userData);

  if (!userDataDto) {
    return { isValid: false, message: 'Could not get user list', data: null };
  }
  return { isValid: true, message: 'User list obtained successfully', data: userDataDto };
}

module.exports = {
  createPatient,
  createTherapist,
  nameAutoComplete,
  getPatients,
  autoName,
  deleteTherapist,
  findUser,
};
