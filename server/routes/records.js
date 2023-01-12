const express = require("express");
const recordService = require("../services/records");

const app = express();

app.delete('/', async (req, res) => {
  try {
    const data = await recordService.closeRecords(req.body);
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
