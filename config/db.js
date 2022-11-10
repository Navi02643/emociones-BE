process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (process.env.NODE_ENV === "dev") {
  process.env.URLDB = "mongodb+srv://emotionsbe.cketmac.mongodb.net/emotionsBE";
} else {
  process.env.URLDB = "mongodb+srv://emotionsbe.cketmac.mongodb.net/emotionsBE";
}

process.middlewares = [];
