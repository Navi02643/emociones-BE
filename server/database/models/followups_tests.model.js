const mongoose = require("mongoose");
const { Schema } = mongoose;

const testsSchema = new Schema({
  idFollowup: {
    type: String,
  },
  idTest: {
    type: String,
  },
  result: {
    type: String,
  },
});

module.exports = mongoose.model("Tests", testsSchema);