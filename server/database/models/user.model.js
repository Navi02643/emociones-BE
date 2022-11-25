const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  idUser: {
    type: String,
  },
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
    type: String,
  },
  idProfile: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  idRecord: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);