const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("App is running..");
});

mongoose
  .connect(mongoUrl, { dbName: dbName })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port ${port}...`);
      console.log("Connected to database successfully!");
    });
  })
  .catch((error) => {
    console.log("Error in connecting to DB", error);
  });
