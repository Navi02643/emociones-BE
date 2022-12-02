const mongoose = require("mongoose");

const { Schema } = mongoose;

const videoCallsSchema = new Schema({
  idFollowup: {
    type: Schema.Types.ObjectId,
    ref: "followups",
  },
  transcript: {
    type: String,
  },
});

module.exports = mongoose.model("videocalls", videoCallsSchema);
