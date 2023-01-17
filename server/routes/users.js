const express = require("express");
const userService = require("../services/users");
const requireRange = require("../rangeVerification/rangeVerification");

const app = express();

app.post('/register', requireRange, async (req, res) => {
  try {
    const data = await userService.generateUser(req.body, req.headers.authorization.split(" ")[1]);
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

app.get('/autocomplete', async (req, res) => {
  try {
    const data = await userService.nameAutoComplete(req.query, req.headers.authorization.split(" ")[1]);
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

app.get('/patients', requireRange, async (req, res) => {
  try {
    const data = await userService.getPatients(req.query, req.headers.authorization.split(" ")[1]);
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
