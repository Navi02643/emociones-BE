const express = require("express");
const followService = require("../services/follow");

const app = express();

app.post('/createNote', async (req, res) => {
  try {
    const data = await followService.createFollowDay(req.body);
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
