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
  idRecord: {
    type: Schema.Types.ObjectId,
    ref: "records",
  },
  status: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
  },
  range: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("users", userSchema);
