const mongoose = require("mongoose");

const { Schema } = mongoose;

const userRecordSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  idPacient: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  idRecord: {
    type: Schema.Types.ObjectId,
    ref: "records",
  },
  creationDate: {
    type: Date,
  },
});

module.exports = mongoose.model("userrecords", userRecordSchema);
