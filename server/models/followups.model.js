const mongoose = require("mongoose");
const { Schema } = mongoose;

const followupsSchema = new Schema({
  idFollowups: {
    type: String,
  },
  idRecord: {
    type: String,
  },
  Date: {
    type: String,
  },
  Note: {
    type: String,
  }
});

module.exports = mongoose.model("Followups", followupsSchema);