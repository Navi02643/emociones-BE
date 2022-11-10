const express = require("express");
const app = express();

app.use("/default", require("./default"));

module.exports = app;