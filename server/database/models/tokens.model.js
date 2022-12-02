const mongoose = require("mongoose");

const { Schema } = mongoose;
const tokenSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  token: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("tokens", tokenSchema);
