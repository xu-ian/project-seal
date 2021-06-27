import React, { Component } from "react";
import './App.css';
import PostViewer from './components/PostViewer.js';
import Sidebar from './components/Sidebar.js';
//component for the part
import CompanyProfileList from "./components/companyProfile/companyProfile";
import CreateCompanyProfile from "./components/companyProfile/createCompanyProfile";
import EditCompanyProfile from "./components/companyProfile/editCompanyProfile";
import MyCompanyProfile from "./components/companyProfile/myCompanyProfile";
import Registration from "./components/registration"
import Login from "./components/Login"
import Select from "./components/select"
import VideoPlayer from "./components/VideoPlayer"
import ProfilePage from "./components/ProfilePage";
import CreateUserProfile from "./components/UserProfile/CreateUserProfile";
import SearchProfile from "./components/SearchProfile";
// import RoleSelection from "./components/roleSelection"

// import Navbar from "./components/navbar"

// We use Route in order to define the different routes of our application
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function hideSideBar(){
  //include the URL to disclude Sidebar
  if (['/signin', '/profile/create', '/user-profile/create', '/company-profile/create'].includes(window.location.pathname)) return null;
  return <Sidebar />;
} 
export default function App(){
    return(
      <Router>
        <div>
          {hideSideBar()}
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
          <Route exact path="/player">
            <VideoPlayer />
          </Route>
          <Route path = "/profile/create" component={ProfilePage} /> 
          <Route path = "/profile/search" component={SearchProfile} />
          <Route path="/company-profile/list" component={CompanyProfileList} />
          <Route path="/company-profile/create" component={CreateCompanyProfile} />
          <Route path= "/company-profile/view/:id" component={MyCompanyProfile} />
          <Route path="/company-profile/edit/:id" component={EditCompanyProfile} />
          <Route path = "/user-profile/create" component={CreateUserProfile} />
        </Switch>
      </div>
      </Router>  
    );
};

