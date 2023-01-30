const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  maritalStatus: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  range: {
    type: Number,
    default: 1,
  },
  gender: {
    type: String,
  },
  license: {
    type: String,
  },
  idPatients: [{
    type: Schema.Types.ObjectId,
    ref: "users",
  }],
});

module.exports = mongoose.model("users", userSchema);
