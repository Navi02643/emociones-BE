const express = require("express");
const userService = require("../services/users");

const app = express();

app.post('/register', async (req, res) => {
  try {
    const data = await userService.generateUser(req.body);
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
