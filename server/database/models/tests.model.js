const mongoose = require("mongoose");

const { Schema } = mongoose;

const testsSchema = new Schema({
  idTest: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Tests", testsSchema);
