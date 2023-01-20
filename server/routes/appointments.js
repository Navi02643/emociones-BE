const express = require("express");
const appointmentsService = require("../services/appointments");

const app = express();

app.get('/', async (req, res) => {
  try {
    const data = await appointmentsService.getAppointments(req.query, req.headers.authorization.split(" ")[1]);
    return res.status(200).send({
      isValid: data.isValid,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    return res.status(500).send({
      isValid: false,
      message: "Something failed, try again later.",
      data: null,
    });
  }
});

app.post('/', async (req, res) => {
  try {
    const data = await appointmentsService.createAppointment(req.body, req.headers.authorization.split(" ")[1]);
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

app.delete('/', async (req, res) => {
  try {
    const data = await appointmentsService.deleteAppointment(req.query, req.headers.authorization.split(" ")[1]);
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

app.put('/', async (req, res) => {
  try {
    const data = await appointmentsService.updateAppointments(req.body, req.headers.authorization.split(" ")[1]);
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
