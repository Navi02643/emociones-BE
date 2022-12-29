const express = require("express");
const userService = require("../services/users");

const app = express();

app.post('/register', async (req, res) => {
  try {
    const data = await userService.generateUser(req.body);
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
    const { name } = req.params;
    const data = await userService.nameAutoComplete(name);
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
