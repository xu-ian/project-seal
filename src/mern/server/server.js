const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// Importing routes for posts
const companyRouter = require('./routes/company');  
app.use('/company-profile', companyRouter);

// get driver connection
const dbo = require("./db/conn");
const companyRoutes = require("./routes/company");

// const uri = "mongodb://localhost/companys";
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// });

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});