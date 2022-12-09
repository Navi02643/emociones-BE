const express = require("express");
const loginService = require("../services/session");

const app = express();

app.post('/', async (req, res) => {
  try {
    const data = await loginService.login(req.body);
    return res.status(200).send({
      error: false,
      data,
    });
  } catch (error) {
    return res.status(500).send({
      error: 'something failed, try again later',
    });
  }
});

module.exports = app;
