const mongoose = require("mongoose");
const { Schema } = mongoose;

const privilegesSchema = new Schema({
  idPrivileges: {
    type: String,
  },
  Name: {
    type: String,
  },
});

module.exports = mongoose.model("Privileges", privilegesSchema);