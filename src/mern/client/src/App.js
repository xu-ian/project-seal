import React, { Component } from "react";
import './App.css';
import PostViewer from './components/PostViewer.js';
import Sidebar from './components/Sidebar.js';

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
        <div class="content">
        <Switch>
          <Route path="/posts/">
            <PostViewer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      </Router>  
    );
};

function Home() {
    return <h2>Home</h2>;
  }