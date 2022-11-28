const express = require("express");
const cors = require("cors");

const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./server/config/db");
require("colors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const swaggerSpecs = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "EmocionesBE",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "routes/*.js")}`],
};

app.use(bodyParser.json());

app.use("/api", require("./server/routes/index"));

app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerSpecs)),
);

app.use((req, res) => {
  return res.status(404).send({
    resp: "404",
    err: true,
    msg: `URL ${req.url} Not Found`,
    cont: {},
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    "[SERVER]".green,
    `Our app is running on port ${process.env.PORT}`,
  );
});
