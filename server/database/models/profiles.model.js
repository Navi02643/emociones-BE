const mongoose = require("mongoose");

const { Schema } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("profiles", profileSchema);
