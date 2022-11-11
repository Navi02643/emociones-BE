const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  idUser: {
    type: String,
  },
  Name: {
    type: String,
  },
  MiddleName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Password: {
    type: String,
  },
  Birthdate: {
    type: String,
  },
  idProfile: {
    type: String,
  },
  MaritalStatus: {
    type: String,
  },
  idRecord: {
    type: String,
  },
  Status: {
    type: Boolean,
    default: true,
  },
  Background: {
    type: String,
  },
});

module.exports = mongoose.model("Users", userSchema);