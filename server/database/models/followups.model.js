const mongoose = require("mongoose");

const { Schema } = mongoose;

const followupsSchema = new Schema({
  idRecord: {
    type: Schema.Types.ObjectId,
    ref: "records",
  },
  date: {
    type: String,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("followups", followupsSchema);
