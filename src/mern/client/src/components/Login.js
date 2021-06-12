import React from 'react';
import './styling.css';
import axios from 'axios';

import Button from '@material-ui/core/Button';
// import 'fontsource-roboto';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const url = "http://localhost:5000";
const route = "/users/login";


// Sign in component
const Login = () =>  {

  // this function is called when login button is clicked
  function getUserData(e) {
    e.preventDefault();
    const userName = e.target.elements.username.value;  // get username and password from user input
    const passw = e.target.elements.password.value;

    axios.post(url + route, { // post information to database
      username: userName,
      password: passw
    }).then((response) => {
      alert("Login success!");
      window.localStorage.setItem("username", response.data.username);
      window.localStorage.setItem("userId", response.data._id);
    }, (error) => {
      alert("Invalid username or password");
    });

  }

  return(

    <div className="container">

      {/* Heading */}
      <h1 className="loginHeading">
        Sign In
      </h1>

      {/* getUserData() is called and pass event to the function when Login button is clicked*/}
      <form onSubmit={getUserData}> 
        
        {/* User inputs */}
        <div className="input">
          <TextField name="username" variant="outlined" color="primary" label="User name:"/>
        </div>
        <div className="input">
          <TextField name="password" type="password" variant="outlined" color="primary" label="Password:"/>
        </div>

        {/* Login Button */}
        <div className="button">
          <Button type="submit" variant="contained" size="large" color="primary">
            Login
          </Button>
        </div>
      </form>
    </div>

  );
};

export default Login;