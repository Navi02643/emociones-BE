const express = require("express");

const app = express();

const videoCallService = require("../services/videoCall");

app.get("/", async (req, res) => {
  try {
    const data = await videoCallService.videoCallRoute(req.params.room);
    // const data = await videoCallService.videoCallRoute(req.query.room);
    return res.status(200).send({
      isValid: data.isValid,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    return res.status(500).send({
      isValid: false,
      message: error,
      data: null,
    });
  }
});

module.exports = app;
