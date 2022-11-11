const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

require("./server/config/db");
require("colors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(bodyParser.json());

app.use("/api", require("./server/routes/index"));

app.use((req, res, next) => {
  return res.status(404).send({
    resp: "404",
    err: true,
    msg: `URL ${req.url} Not Found`,
    cont: {},
  });
});

server = app.listen(process.env.PORT, () => {
  console.log(
    "[SERVER]".green,
    `Our app is running on port ${process.env.PORT}`
  );
});