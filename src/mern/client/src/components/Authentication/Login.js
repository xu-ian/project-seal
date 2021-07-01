import React, { Component } from "react";
import '../styling.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// for redux 
import PropTypes from "prop-types";
import { loginUser } from '../actions/authActions';
import { connect } from 'react-redux';
import classnames from "classnames";
import { withRouter } from 'react-router';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/authenticated");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/authenticated"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: this.state.name,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">

        {/* Heading */}
        <h1 className="loginHeading">
          Sign In
        </h1>

        {/* getUserData() is called and pass event to the function when Login button is clicked*/}
        <form onSubmit={this.onSubmit}> 
          
          {/* User inputs */}
          <div className="input">
            <TextField name="username" variant="outlined" color="primary" label="User name:"
              id="name" onChange={this.onChange} value={this.state.name} error={errors.name} className={classnames("", {invalid: errors.name,})}/>
          </div>
          <div className="input">
            <TextField name="password" type="password" variant="outlined" color="primary" label="Password:"
              id="password" onChange={this.onChange} value={this.state.password} error={errors.password} className={classnames("", {invalid: errors.password,})}/>
          </div>

          {/* Login Button */}
          <div className="button">
            <Button type="submit" variant="contained" size="large" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>      
    )
  }

}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));