const express = require("express");
const loginService = require("../services/session");

const app = express();

app.delete('/logout', async (req, res) => {
  try {
    const data = await loginService.logout(req.body, req.headers.authorization.split(" ")[1]);
    return res.status(200).send({
      isValid: data.isValid,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    return res.status(500).send({
      isValid: false,
      message: 'something failed, try again later',
      data: null,
    });
  }
});

module.exports = app;
