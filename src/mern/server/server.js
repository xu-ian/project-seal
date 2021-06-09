const express = require("express");
var bodyParser = require('body-parser')
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
const port = process.env.PORT || 5000;
const passport = require("passport");

var usersRouter = require("./routes/users");

const app = express();

// create application/json parser
 
// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

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
app.get('/', (req, res)=> res.send('Hello World!'));
app.use('/users', usersRouter);
// app.use(require("./routes/record")); //the example one

//import postRoutes from './routes/posts.js';
//app.use('/posts', postRoutes);
app.use(require('./routes/company'));

// get driver connection
//const dbo = require("./db/conn");

//SEAL-3
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn"); 

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);

//   });
//   console.log(`Server is running on port: ${port}`);
// });

// app.listen(port, () => console.log(`Server up and running on port ${port} !`));
