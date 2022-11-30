const express = require("express");

const app = express();

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      error: false,
      data: "FUNCIONANDO",
    });
  } catch (error) {
    return res.status(500).send({
      error: 'something failed, try again later',
    });
  }
});

module.exports = app;
