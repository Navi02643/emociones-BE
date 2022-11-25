const express = require("express");
const app = express();

app.use("/default", require("./default"));
app.use('/privileges', require('./privileges'));
app.use('/login', require('./login'));

module.exports = app;