const mongoose = require("mongoose");

const { Schema } = mongoose;

const followupsSchema = new Schema({
  idFollowups: {
    type: String,
  },
  idRecord: {
    type: String,
  },
  date: {
    type: String,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("Followups", followupsSchema);
