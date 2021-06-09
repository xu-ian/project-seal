const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
const port = process.env.PORT || 5000;
const passport = require("passport");

// mongoose setup
var mongoose = require('mongoose');

var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('connected', () => {
  console.log('connected to mongodb, status ' + mongoose.connection.readyState);
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/users"))
// get driver connection
//const dbo = require("./db/conn");

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);

//   });
//   console.log(`Server is running on port: ${port}`);
// });