const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const port = 8080;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Ian:mongodb@cscc01-seal.pawl3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// Importing routes for posts
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/comments');
app.use('/comments', commentsRouter);
// get driver connection
const dbo = require("./db/conn");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.listen(port, () => {
  // perform a database connection when server starts
  
  console.log(`Server is running on port: ${port}`);
});