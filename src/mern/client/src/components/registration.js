import React from 'react';
import './styling.css';
import axios from 'axios';
// import { Route } from "react-router-dom";

const url = "http://localhost:5000";
const route = "/users/register";

const Registration = () => {
  let history = useHistory();

  function register(e) {
    e.preventDefault();
    const userName = e.target.elements.un.value;  // get user information from user input
    const email = e.target.elements.email.value;
    const passw = e.target.elements.pw.value;

    var info = {
      username: userName,
      email: email,
      password: passw
    }

    // history.push(`/roleselect/${info}`);
    
    axios.post(url + route, info).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  return(
    <div className="title">
      <h1>Create Account</h1>
      <form onSubmit={register}> {/* pass event to the function when Login button is clicked*/}
        <div className="input">
          <label>
          <p>Username:</p>
          <input name="un" type="text" placeholder="User Name" />
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
            <input name="pw" type="password" placeholder="Password"/>
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