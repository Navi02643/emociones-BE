const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send("Funcionando");
});

module.exports = app;
