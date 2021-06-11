import React from 'react';
import './styling.css';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const url = "http://localhost:5000";
const route = "/users/register";

const Registration = () => {

  var roles = {startupfounder:false, investor:false, instructor:false};

  function register(e) {
    e.preventDefault();
    // get user information from user input
    const userName = e.target.elements.username.value;  
    const email = e.target.elements.email.value;
    const passw = e.target.elements.password.value;

    // check if user select at least one role
    if (roles.startupfounder || roles.investor || roles.instructor) {
      var info = {
        username: userName,
        email: email,
        password: passw,
        role: roles
      }
      
      // send info to enpoint
      axios.post(url + route, info).then((response) => {  
        alert("Registered");
        window.location.replace("/signin");
      }, (error) => {
        alert("Failed:"+ error);
      });

    } else {
      alert("Please select at least one role");
    }

  }



  return(
    <div className="container">
      {/* Heading */}
      <Typography className="signUpHeading" variant="h3">
        Create Account
      </Typography>    

      {/* register() is called and pass event to the function when Login button is clicked*/}
      <form onSubmit={register}> 

        {/* User inputs */}
        <div className="input">
          <TextField name="username" variant="outlined" color="primary" label="User name:"/>
        </div>
        <div className="input">
          <TextField name="email" type="text" variant="outlined" color="primary" label="Email:"/>
        </div>
        <div className="input">
          <TextField name="password" type="password" variant="outlined" color="primary" label="Password:"/>
          <br/>
          <div>(minimum of 8 characters)</div>
        </div>

        {/* Role selection */}
        <div>
          <Typography  variant="h6">
            Please select roles:
          </Typography> 
        </div>
        <div className="input">
          <label>
            {/* set roles.startupfounder to true if the box is checked */}
            <input type="checkbox" id="founder"
                onClick={() => 
                  roles.startupfounder = document.getElementById("founder").checked}/>
            I am a Startup Founder 
          </label><br/>
          <label>
            {/* set roles.investor to true if the box is checked */}
            <input type="checkbox" id="investor"
                onClick={() => 
                  roles.investor = document.getElementById("investor").checked}/>
            I am an Investor 
          </label><br/>
          <label>
            {/* set roles.instructor to true if the box is checked */}
            <input type="checkbox" id="instructor"
                onClick={() => 
                  roles.instructor = document.getElementById("instructor").checked}/>
            I am an Instructor 
          </label>
        </div>

        {/* Sign up button */}
        <div className="button">
          <Button type="submit" variant="contained" size="large" color="primary">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;