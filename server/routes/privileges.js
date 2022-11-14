const privilegeService = require("../services/privileges");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  try {
    const data = await privilegeService.findPrivilege();
    return res.status(200).send({
      status: "200",
      err: false,
      data,
    });
  } catch (err) {
    return res.status(500).send({
      status: "500",
      err: true,
      err: Object.keys(err).length === 0 ? err.message : err,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const msg = await privilegeService.savePrivilege(req.body)
    return res.status(200).send({
        status: "200",
        err: false,
        msg
      });
  } catch (err) {
    return res.status(500).send({
      status: "500",
      err: true,
      err: Object.keys(err).length === 0 ? err.message : err,
    });
  }
});

module.exports = app;
