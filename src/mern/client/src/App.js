import React from "react";
import './App.css';
import PostViewer from './components/PostViewer.js';
import Sidebar from './components/Sidebar.js';

import CompanyProfileList from "./components/companyProfile/companyProfile";
import CreateCompanyProfile from "./components/companyProfile/createCompanyProfile";
import EditCompanyProfile from "./components/companyProfile/editCompanyProfile";
import MyCompanyProfile from "./components/companyProfile/myCompanyProfile";

import Registration from "./components/Authentication/registration";
import Login from "./components/Authentication/Login";
import Select from "./components/Authentication/select";
import Authenticated from "./components/Authentication/Authenticated";
import AssignTest from "./components/ToggleForm"
import VideoPlayer from "./components/VideoPlayer";

// for redux
import jwt_decode from "jwt-decode";
import setAuthToken from "./authUtils/setAuthToken";
import { setCurrentUser, logoutUser } from "./components/actions/authActions";


import Courses from "./components/Courses"
import CoursePage from "./components/CoursePage"

// We use Route in order to define the different routes of our application


//redux setup
import { Provider } from "react-redux";
import store from "./components/store";


import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}


function hideSideBar(){
  //include the URL to disclude Sidebar
  if (['/signin', '/profile/create', '/user-profile/create', '/company-profile/create'].includes(window.location.pathname)) return null;
  return <Sidebar />;
} 
export default function App(){
    return(
      <Provider store={store}>
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
            <Route exact path="/authenticated">
              <Authenticated />
            </Route>
            <Route exact path="/player">
              <VideoPlayer />
            </Route>
            <Route exact path="/assigntest">
						  <AssignTest />
					  </Route>
            <Route path="/list"> 
              <CompanyProfileList />
            </Route>
            <Route path="/create">
              <CreateCompanyProfile />
            </Route>
              <Route path="/company-profile/list" component={CompanyProfileList} />
              <Route path="/company-profile/create" component={CreateCompanyProfile} />
              <Route path= "/company-profile/view/:id" component={MyCompanyProfile} />
              <Route path="/company-profile/edit/:id" component={EditCompanyProfile} />
          </Switch>
          </div>
        </Router>  
      </Provider>
    );
};

