const express = require("express");
const loginService = require("../services/session");

const app = express();

app.delete('/logout', async (req, res) => {
  try {
    const data = await loginService.logout(req.body, req.headers.authorization.split(" ")[1]);
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
