const mongoose = require("mongoose");

const { Schema } = mongoose;

const testsSchema = new Schema({
  idFollowup: {
    type: Schema.Types.ObjectId,
    ref: "followups",
  },
  idTest: {
    type: Schema.Types.ObjectId,
    ref: "records",
  },
  result: {
    type: String,
  },
});

module.exports = mongoose.model("tests", testsSchema);
