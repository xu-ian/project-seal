const express = require("express");
var bodyParser = require('body-parser')
const cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./config/config.env" });
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(cors());

const passport = require("passport");

var usersRouter = require("./routes/users");

// create application/json parser
 
// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({extended: true})); 

app.use(express.json());

// Importing routes for posts
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

var uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('connected', () => {
  console.log('connected to mongodb, status ' + mongoose.connection.readyState);
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

const commentsRouter = require('./routes/comments');
app.use('/', commentsRouter);
// get driver connection
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

app.get('/', (req, res)=> res.send('Hello World!'));
app.use('/users', usersRouter);
// app.use(require("./routes/record")); //the example one
// const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;

// Importing routes for posts
const companyRouter = require('./routes/company');  
app.use('/company-profile', companyRouter);
app.use(express.json({limit: '50mb', extended: true }));
app.use(express.urlencoded({limit: '50mb', extended: true }));
const userProfilesRoute = require('./routes/userProfile'); 
app.use('/user-profile', userProfilesRoute);

// get driver connection
//const dbo = require("./db/conn");

//SEAL-3
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn"); 
const companyRoutes = require("./routes/company");

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

