const expressAccessToken = require("express-access-token");
const express = require("express");

const app = express();

const firewall = require("../security/accesstoken");

app.use("/default", expressAccessToken, firewall, require("./default"));
app.use("/login", require("./login"));
app.use("/logout", require("./logout"));

module.exports = app;
