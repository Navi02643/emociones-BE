const { Types } = require("mongoose");
const UserRecordModel = require('./models/user_record.model');

async function registerRecord(record) {
  const userRecordSave = new UserRecordModel(record);
  const saveUserRecord = await userRecordSave.save();
  return saveUserRecord;
}

async function getRecordsByUser(user, parameters, offset) {
  const records = await UserRecordModel.aggregate([
    { $match: { idUser: user } },
    {
      $lookup: {
        from: "users",
        localField: "idPacient",
        foreignField: "_id",
        as: "Pacient",
        pipeline: [{
          $addFields: { fullName: { $concat: ["$name", " ", "$middleName", " ", "$lastName"] } },
        }],
      },
    },
    {
      $lookup: {
        from: "records",
        localField: "idRecord",
        foreignField: "_id",
        as: "Record",
      },
    },
    {
      $unwind: "$Record",
    },
    {
      $unwind: "$Pacient",
    },
    {
      $skip: offset,
    },
    {
      $limit: parameters.value.size,
    },
    {
      $sort: { [parameters.value.order]: parameters.value.way },
    },
  ]);
  return records;
}

async function closeRecord(record) {
  const recordDelete = await UserRecordModel.findOneAndUpdate(record.idRecord, { status: false });
  return recordDelete;
}

async function getRecord(id) {
  const record = await UserRecordModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'idUser',
        foreignField: '_id',
        as: 'therapist',
      },
    }, {
      $lookup: {
        from: 'users',
        localField: 'idPacient',
        foreignField: '_id',
        as: 'patient',
      },
    }, {
      $lookup: {
        from: 'records',
        localField: 'idRecord',
        foreignField: '_id',
        as: 'record',
      },
    },
    { $unwind: "$therapist" },
    { $unwind: "$patient" },
    { $unwind: "$record" },
    {
      $match: {
        idRecord: new Types.ObjectId(id),
      },
    },
  ]);
  return record;
}

module.exports = {
  registerRecord,
  getRecordsByUser,
  closeRecord,
  getRecord,
};
