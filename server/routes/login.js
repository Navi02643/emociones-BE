const express = require("express");
const loginService = require("../services/login");

const app = express();

app.post('/login', async (req, res) => {
  try {
    const data = await loginService.login(req.body);
    return res.status(200).send({
      error: false,
      data,
    });
  } catch (error) {
    return res.status(500).send({
      error: Object.keys(error).length === 0 ? error.message : error,
    });
  }
});

app.get('/secure', (req, res) => {
  res.send('Secure');
});

module.exports = app;
