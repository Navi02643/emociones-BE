const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordsSchema = new Schema({
  cause: {
    type: String,
  },
  open: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("records", recordsSchema);
