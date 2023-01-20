const UserModel = require('./models/user.model');
const RANGE = require('../utils/range.constans');

async function saveUser(user) {
  const newUser = new UserModel(user);
  const userSave = await newUser.save();
  return userSave;
}

async function findEmail(email) {
  const searchEmail = await UserModel.findOne({ email });
  return searchEmail;
}

async function findPatient(user) {
  const searchPatient = await UserModel.find({ name: { $regex: `${user.name}` }, range: RANGE.patient });
  return searchPatient;
}

async function findPatientsN() {
  const searchPatient = await UserModel.find({ range: RANGE.patient });
  return searchPatient;
}

async function findById(id) {
  const searchId = await UserModel.findById(id);
  return searchId;
}

async function removeRecord(id) {
  const updateUser = await UserModel.findByIdAndUpdate(id, { $unset: { idRecord: '' } });
  return updateUser;
}

async function addPatient(therapist, patient) {
  const addedPatient = await UserModel.updateOne({ _id: therapist }, { $push: { idPatients: patient } });
  return addedPatient;
}

async function findPatientsByTherapist(id, data, offset) {
  const foundPatients = await UserModel.aggregate([{
    $match: { _id: id },
  }, {
    $lookup: {
      from: "users",
      localField: "idPatients",
      foreignField: "_id",
      as: "patients",
      pipeline: [{
        $project: { name: 1, middleName: 1, lastName: 1 },
      }, {
        $addFields: { fullName: { $concat: ["$name", " ", "$middleName", " ", "$lastName"] } },
      }, {
        $skip: offset,
      }, {
        $limit: data.value.size,
      }, {
        $sort: { fullName: data.value.way },
      }],
    },
  }, {
    $project: {
      name: 1, middleName: 1, lastName: 1, idPatients: 1, patients: 1,
    },
  }]);
  return foundPatients[0];
}

async function deleteTherapist(therapist) {
  const idTherapist = await UserModel.findOneAndDelete({ _id: `${therapist._id}` });
  return idTherapist;
}

module.exports = {
  saveUser,
  findEmail,
  findPatient,
  findById,
  removeRecord,
  addPatient,
  findPatientsByTherapist,
  deleteTherapist,
  findPatientsN,
};
