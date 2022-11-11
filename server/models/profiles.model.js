const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  idProfile: {
    type: String,
  },
  Name: {
    type: String,
  },
});

module.exports = mongoose.model("Profiles", profileSchema);