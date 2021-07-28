const express = require("express");
const passport = require("passport");
const bodyParser = require('body-parser')
const cors = require("cors");
var mongoose = require("mongoose");
var multer = require("multer");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" });
dotenv.config({ path: "./config/config.env" });
const applyRoutes = require('./routes');
const MongoClient = require('mongodb').MongoClient;
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const messageRouter = require('./routes/conversations');
const conversationRouter = require('./routes/messages');
const friendsRouter = require('./routes/friends');

const app = express();

app.use(cors());
applyRoutes(app);

app.use("/", messageRouter);
app.use("/", conversationRouter);

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: true
//}));

// create application/json parser
// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Importing routes for posts

app.use('/posts', postsRouter);

// Importing routes for content and events
const contentRouter = require('./routes/content')
app.use('/content', contentRouter);
const eventRouter = require('./routes/events')
app.use('/events', eventRouter);

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
app.use('/friends', friendsRouter);

// Importing routes for posts
const companyRouter = require('./routes/company');  
app.use('/company-profile', companyRouter);
app.use(express.json({limit: '50mb', extended: true }));
app.use(express.urlencoded({limit: '50mb', extended: true }));
const userProfilesRoute = require('./routes/userProfile'); 
app.use('/user-profile', userProfilesRoute);

//SEAL-3
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn"); 
const companyRoutes = require("./routes/company");


// SEAL-16
const searchRouter = require('./routes/search');  
app.use('/search', searchRouter);


// SEAL-12: Setting storage for file uploads

var deliverableRouter = require('./routes/deliverables');
app.use('/deliverables', deliverableRouter);

var deliverableRoutes = require('./routes/deliverables');

// SEAL-18
const offerRouter = require('./routes/offers');  
app.use('/offers', offerRouter);
const offercommentsRouter = require('./routes/offercomments');
app.use('/', offercommentsRouter);


const courseRouter = require('./routes/courses/index');
app.use('/', courseRouter);

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
