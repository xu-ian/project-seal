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
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/comments');
app.use('/', commentsRouter);
// get driver connection
const dbo = require("./db/conn");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});