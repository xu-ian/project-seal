import React from 'react';
import './styling.css';
import axios from 'axios';

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
    }, (error) => {
      alert("Invalid username or password");
    });

    // axios.get(url + route) // get user data from database
    //   .then((response) => {
    //     const dat = response.data
    //     var i;
    //     var authenticated = false;

    //     // loop though all user data and see if user input matches
    //     for (i = 0; i < dat.length; i++) {
    //       // user input is match
    //       if (userName === dat[i].username && passw === dat[i].password) {
    //         authenticated = true;
    //         break;
    //       }
    //     }
        
    //     if (authenticated) {
    //       console.log("Log in success!");
    //     } else {
    //       console.log("invalid username or password");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

  }

  return(

    <div className="title">
      <h1>Sign in</h1>
      <form onSubmit={getUserData}>  {/* pass event to the function when Login button is clicked*/}
        <div className="input">
          <label>
          <p>Username:</p>
          <input name="username" type="text" placeholder="User Name" />
          </label>
        </div>
        <div className="input">
          <label>
            <p>Password:</p>
            <input name="password" type="password" placeholder="Password"/>
          </label>
        </div>
        <div className="loginButton">
          <button className="button1" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;