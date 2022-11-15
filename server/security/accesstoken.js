const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());

const accessTokens = ['123456789','9876543210'];

const firewall = (req, res, next) => {
  const authorized = accessTokens.includes(req.query.accessToken);
  if (!authorized) return res.status(401).send("Unauthorized");
  next();
};

module.exports = firewall;