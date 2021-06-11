import React, { Component } from "react";
import './App.css';
import PostViewer from './components/PostViewer.js';
import Sidebar from './components/Sidebar.js';
import Registration from "./components/registration"
import Login from "./components/Login"
import Select from "./components/select"
import VideoPlayer from "./components/VideoPlayer"
// import RoleSelection from "./components/roleSelection"

// import Navbar from "./components/navbar"

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
          <Route exact path="/">
            <Select />
          </Route>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Registration />
          </Route>
          <Route exact path="/signup">
            <VideoPlayer />
          </Route>
        </Switch>
      </div>
      </Router>  
    );
};

function Home() {
    return <h2>Home</h2>;
  }