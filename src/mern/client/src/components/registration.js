import React from 'react';
import './styling.css';
import axios from 'axios';
// import { Route } from "react-router-dom";

const url = "http://localhost:5000";
const route = "/users/register";

const Registration = () => {

  var roles = {startupfounder:false, investor:false, instructor:false};

  function register(e) {
    e.preventDefault();
    const userName = e.target.elements.username.value;  // get user information from user input
    const email = e.target.elements.email.value;
    const passw = e.target.elements.password.value;

    console.log(roles);
    // check if user select at least one role
    if (roles.startupfounder || roles.investor || roles.instructor) {
      var info = {
        username: userName,
        email: email,
        password: passw,
        role: roles
      }
      
      axios.post(url + route, info).then((response) => {
        alert("Registered");
      }, (error) => {
        console.log(error);
      });

    } else {
      alert("Please select at least one role");
    }

  }



  return(
    <div className="title">
      <h1>Create Account</h1>
      <form onSubmit={register}> {/* pass event to the function when Login button is clicked*/}
        <div className="input">
          <label>
          <p>Username:</p>
          <input name="username" type="text" placeholder="User Name" />
          </label>
        </div>
        <div className="input">
          <label>
          <p>Email:</p>
          <input name="email" type="text" placeholder="Email" />
          </label>
        </div>
        <div className="input">
          <label>
            <p>Password:</p>
            <input name="password" type="password" placeholder="Password"/>
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" id="founder"
                onClick={() => 
                  roles.startupfounder = document.getElementById("founder").checked}/>
            Startup founder
          </label><br/>
          <label>
            <input type="checkbox" id="investor"
                onClick={() => 
                  roles.investor = document.getElementById("investor").checked}/>
            Investor
          </label><br/>
          <label>
            <input type="checkbox" id="instructor"
                onClick={() => 
                  roles.instructor = document.getElementById("instructor").checked}/>
            Instructor
          </label>

        </div>
        <div className="loginButton">
          <button className="button1" type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;