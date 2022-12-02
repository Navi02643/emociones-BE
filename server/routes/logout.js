const express = require("express");
const logoutService = require("../services/logout");

const app = express();

app.delete('/', async (req, res) => {
  try {
    const data = await logoutService.logout(req.body, req.headers.authorization.split(" ")[1]);
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
