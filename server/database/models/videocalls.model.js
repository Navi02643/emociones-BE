const mongoose = require("mongoose");

const { Schema } = mongoose;

const videocallsSchema = new Schema({
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

module.exports = mongoose.model("Videocalls", videocallsSchema);
