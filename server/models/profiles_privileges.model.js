const mongoose = require("mongoose");
const { Schema } = mongoose;

const profiles_privilegesSchema = new Schema({
    idProfile: {
        type: String,
    },
    idPrivileges: {
    type: String,
    },
});

module.exports = mongoose.model("Profiles_Privileges", profiles_privilegesSchema);