import React, { Component } from "react";
import './App.css';
import PostViewer from './PostViewer.js';
import PostAdder from './PostAdder.js';
import Sidebar from './Sidebar.js';
import Post from './Post.js';
import Comment from './Comment.js';

// We use Route in order to define the different routes of our application
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function App(){
    return(
      <Router>
          <div>
        <Sidebar />
        </div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div class="content">
        <Switch>
          <Route path= "/about">
            <PostAdder />
          </Route>
          <Route path="/posts/1">
            <PostViewer />
          </Route>
          <Route path="/posts/post">
            <Post />
            <Comment />
            <Comment />
          </Route>
          <Route path="/">
            <Home />
            <form action="/post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>
          </Route>
        </Switch>
      </div>
      </Router>  
    );
};

function Home() {
    return <h2>Home</h2>;
  }