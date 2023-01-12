const mongoose = require("mongoose");

const { Schema } = mongoose;

const testsSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("tests", testsSchema);
