import React, { Component } from "react";
import '../styling.css';


// for redux 
import PropTypes from "prop-types";
import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux';
import classnames from "classnames";
import { withRouter } from 'react-router';


class Authenticated extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <h2>Welcome </h2> 
        {/* {window.localStorage.getItem("username")} */}
        <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem",
        }}
        onClick={this.onLogoutClick}
        >
          Logout
        </button>
      </div>

    ) 
  }
}

Authenticated.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Authenticated));