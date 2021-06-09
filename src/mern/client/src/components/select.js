import React from 'react';
import { useHistory } from "react-router-dom";
import './styling.css';


const Select = () => {
  let history = useHistory();

  function toLogin() {
    history.push("/signin");
  }

  function toSignup() {
    history.push("/signup");
  }

  return (
    <div className="title">
      <h1>African Impact Challenge</h1>
      <div className="loginButton">
        <button className="button1" onClick={toLogin}>Login</button>
      </div>
      <div className="loginButton">
        <button className="button1" onClick={toSignup}>Sign up</button>
      </div>

    </div>
  )
}

export default Select;