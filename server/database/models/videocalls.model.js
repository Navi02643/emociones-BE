const mongoose = require("mongoose");

const { Schema } = mongoose;

const videoCallsSchema = new Schema({
  idVideoCall: {
    type: String,
  },
  idFollowup: {
    type: String,
  },
  transcript: {
    type: String,
  },
});

module.exports = mongoose.model("Videocalls", videoCallsSchema);
