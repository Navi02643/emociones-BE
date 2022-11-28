const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("Tokens", tokenSchema);
