const mongoose = require("mongoose");
const { Schema } = mongoose;

const privilegesSchema = new Schema({
  idPrivileges: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Privileges", privilegesSchema);