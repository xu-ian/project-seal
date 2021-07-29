import React from "react";
import './App.css';
import PostViewer from './components/Posts/PostViewer.js';
import Sidebar from './components/Sidebar.js';

import CompanyProfileList from "./components/companyProfile/companyProfile";
import CreateCompanyProfile from "./components/companyProfile/createCompanyProfile";
import EditCompanyProfile from "./components/companyProfile/editCompanyProfile";
import MyCompanyProfile from "./components/companyProfile/myCompanyProfile";


import ProfilePage from "./components/ProfilePage";
import UserProfileList from "./components/UserProfile/UserProfile";
import CreateUserProfile from "./components/UserProfile/CreateUserProfile";
import EditUserProfile from "./components/UserProfile/EditUserProfile";
import MyUserProfile from "./components/UserProfile/MyUserProfile";
import SearchProfile from "./components/SearchProfile";
import FriendRequest from "./components/FriendRequest";
// import RoleSelection from "./components/roleSelection"


import Registration from "./components/Authentication/registration";
import Login from "./components/Authentication/Login";
import Select from "./components/Authentication/select";
import FriendList from "./components/DMs/FriendList"
import Authenticated from "./components/Authentication/Authenticated";
import AssignTest from "./components/ToggleForm";
import VideoPlayer from "./components/VideoPlayer";
import Submit from './components/Submit';
import Calendar from './components/Calendar'

// for redux
import jwt_decode from "jwt-decode";
import setAuthToken from "./authUtils/setAuthToken";
import { setCurrentUser, logoutUser } from "./components/actions/authActions";


import Courses from "./components/Courses"
import CoursePage from "./components/CoursePage"


import UploadVideo from "./components/Video/UploadVideo";
import ListVideo from "./components/Video/ListVideo";
import EditVideo from "./components/Video/EditVideo";

// We use Route in order to define the different routes of our application


//redux setup
import { Provider } from "react-redux";
import store from "./components/store";


import {
    BrowserRouter as Router,
    Switch,
    Route
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
            <Route exact path="/calendar">
              <Calendar />
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

              <Route path = "/profile/create" component={ProfilePage} /> 
              <Route path = "/profile/search" component={SearchProfile} />
              <Route path="/user-profile/list" component={UserProfileList} />
              <Route path="/user-profile/create" component={CreateUserProfile} />
              <Route path = "/user-profile/edit/:id" component={EditUserProfile} /> 
              <Route path= "/user-profile/view/:id" component={MyUserProfile} />

              <Route path="/company-profile/list" component={CompanyProfileList} />
              <Route path="/company-profile/create" component={CreateCompanyProfile} />
              <Route path= "/company-profile/view/:id" component={MyCompanyProfile} />
              <Route path="/company-profile/edit/:id" component={EditCompanyProfile} />
              <Route path="/friend/view/:id" component={FriendRequest} />

              <Route path="/videos/upload" component={UploadVideo} />
              <Route path="/videos/list" component={ListVideo} />
              <Route path="/videos/edit" component={EditVideo} />
              


              <Route path = "/friendlist/">
              <FriendList/>
            </Route>
            <Route path = "/submit/:id" component={Submit}/>
          </Switch>
          </div>
        </Router>  
      </Provider>
    );
};

