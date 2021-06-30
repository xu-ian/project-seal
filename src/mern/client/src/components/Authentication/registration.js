import React, { Component } from "react";
import '../styling.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//redux required imports
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import classnames from "classnames";


class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      startupfounder: false,
      investor: false,
      instructor: false,
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: {startupfounder: this.state.startupfounder, 
        investor: this.state.investor,
        instructor: this.state.instructor
      }
    };

    // check if user select at least one role
    if (newUser.role.startupfounder || newUser.role.investor || newUser.role.instructor) {
      this.props.registerUser(newUser, this.props.history);
    } else {
      alert("Please select at least one role");
    }
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="container">
        {/* Heading */}
        <h1 className="signUpHeading" variant="h3">
          Create Account
        </h1>    

        {/* register() is called and pass event to the function when Login button is clicked*/}
        <form onSubmit={this.onSubmit}> 

          {/* User inputs */}
          <div className="input">
            <TextField name="username" variant="outlined" color="primary" label="User name:"
              id="name" onChange={this.onChange} value={this.state.name} error={errors.name} className={classnames("", {invalid: errors.name,})}/>
          </div>
          <div className="input">
            <TextField name="email" type="text" variant="outlined" color="primary" label="Email:"
              id="email" onChange={this.onChange} value={this.state.email} error={errors.email} className={classnames("", {invalid: errors.email,})}/>
          </div>
          <div className="input">
            <TextField name="password" type="password" variant="outlined" color="primary" label="Password:"
              id="password" onChange={this.onChange} value={this.state.password} error={errors.password} className={classnames("", {invalid: errors.password,})}/>
              
            <br/>
            <div>(minimum of 8 characters)</div>
          </div>

          {/* Role selection */}
          <div>
            <h1 >
              Please select roles:
            </h1> 
          </div>
          <div className="input">
            <label>
              {/* set roles.startupfounder to true if the box is checked */}
              <input type="checkbox" id="founder"
                  onClick={() => 
                    this.setState( {startupfounder: document.getElementById("founder").checked} )}/>
              I am a Startup Founder 
            </label><br/>
            <label>
              {/* set roles.investor to true if the box is checked */}
              <input type="checkbox" id="investor"
                  onClick={() => 
                    this.setState( {investor: document.getElementById("investor").checked} )}/>
              I am an Investor 
            </label><br/>
            <label>
              {/* set roles.instructor to true if the box is checked */}
              <input type="checkbox" id="instructor"
                  onClick={() => 
                    this.setState( {instructor: document.getElementById("instructor").checked} )}/>
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
    )
  }
}

Registration.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Registration));