const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordsSchema = new Schema({
  idRecord: {
    type: String,
  },
  Cause: {
    type: String,
  },
});

module.exports = mongoose.model("Records", recordsSchema);