const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordsSchema = new Schema({
  idRecord: {
    type: String,
  },
  cause: {
    type: String,
  },
});

module.exports = mongoose.model("Records", recordsSchema);