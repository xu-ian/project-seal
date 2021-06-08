const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const applyRoutes = require('./routes');
const dbo = require("./db/conn");

const app = express();
applyRoutes(app);
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// get driver connection


app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});