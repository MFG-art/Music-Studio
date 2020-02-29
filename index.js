const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const APIroutes = require("./routes/api.js");
const HTMLroutes = require("./routes/html.js");
const path = require("path");

const dotenv = require("dotenv").config();
console.log(dotenv);
console.log(process.env.DB);

const app = express();
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

app.use(logger("dev"));

app.use(bodyParser.json());
app.use("/api", APIroutes);
app.use("/", HTMLroutes);
app.use((err, req, res, next) => {
  console.log(err);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
