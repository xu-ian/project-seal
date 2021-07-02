import React from "react";
import './App.css';
import PostViewer from './components/PostViewer.js';
import Sidebar from './components/Sidebar.js';

import CompanyProfileList from "./components/companyProfile/companyProfile";
import CreateCompanyProfile from "./components/companyProfile/createCompanyProfile";
import EditCompanyProfile from "./components/companyProfile/editCompanyProfile";
import MyCompanyProfile from "./components/companyProfile/myCompanyProfile";
import Registration from "./components/registration"
import Login from "./components/Login"
import Select from "./components/select"
import VideoPlayer from "./components/VideoPlayer"
import FriendList from "./components/FriendList"
//import UploadFile from "./components/UploadFile"

// import RoleSelection from "./components/roleSelection"

// import Navbar from "./components/navbar"
import Courses from "./components/Courses"
import CoursePage from "./components/CoursePage"

// We use Route in order to define the different routes of our application
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

function hideSideBar(){
  //include the URL to disclude Sidebar
  if (['/profile/create','/signin'].includes(window.location.pathname)) return null;
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
          <Route path="/courses">
            <Courses />
          </Route>
          <Route path="/coursepage">
            <CoursePage />
          </Route>
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
          <Route path="/list"> 
            <CompanyProfileList />
          </Route>
          <Route path="/create">
            <CreateCompanyProfile />
          </Route>
          <Route path = "/friendlist/">
            <FriendList/>
          </Route>
          <Route path="/company-profile/list" component={CompanyProfileList} />
          <Route path="/company-profile/create" component={CreateCompanyProfile} />
          <Route path= "/company-profile/view/:id" component={MyCompanyProfile} />
          <Route path="/company-profile/edit/:id" component={EditCompanyProfile} />
        </Switch>
      </div>
      </Router>  
    );
};

