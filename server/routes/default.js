const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      estatus: "200",
      err: false,
      msg: "FUNCIONANDO",
    });
  } catch (err) {
    return res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
