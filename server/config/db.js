const mongoose = require("mongoose");

process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (process.env.NODE_ENV === "dev") {
  process.env.URLDB =
    "mongodb+srv://admin:admin@emotionsbe.cketmac.mongodb.net/emotionsBE";
} else {
  process.env.URLDB =
    "mongodb+srv://admin:admin@emotionsbe.cketmac.mongodb.net/emotionsBE";
}

process.middlewares = [];

mongoose
  .connect(process.env.URLDB, {})
  .then((resp) => {
    console.log("[SERVER]".green, `Database ONLINE in ${process.env.URLDB}`);
  })
  .catch((err) => {
    console.log("[SERVER]".red, `Failed connection: ${err}`);
  });
