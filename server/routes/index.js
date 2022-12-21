const expressAccessToken = require("express-access-token");
const express = require("express");

const app = express();

const firewall = require("../security/accesstoken");

app.use("/login", require("./login"));
app.use("/user", expressAccessToken, firewall, require("./users"));
app.use("/session", expressAccessToken, firewall, require("./session"));
app.use("/appointments", expressAccessToken, firewall, require("./appointments"));

module.exports = app;
