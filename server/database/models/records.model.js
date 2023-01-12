const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordsSchema = new Schema({
  cause: {
    type: String,
  },
});

module.exports = mongoose.model("records", recordsSchema);
