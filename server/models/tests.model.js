const mongoose = require("mongoose");
const { Schema } = mongoose;

const testsSchema = new Schema({
  idTest: {
    type: String,
  },
  Name: {
    type: String,
  },
  Description: {
    type: String,
  }
});

module.exports = mongoose.model("Tests", testsSchema);