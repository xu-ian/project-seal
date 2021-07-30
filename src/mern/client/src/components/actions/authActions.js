import axios from "axios";
import setAuthToken from "../../authUtils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

const url = "http://localhost:5000";


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(url + "/users/register", userData)
    .then(res => history.push("/signin")) // re-direct to login on successful register
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      alert("Failed:"+ err);

      }
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post(url + "/users/login", userData)
    .then(res => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      window.localStorage.setItem("username", decoded.name);
      window.localStorage.setItem("userId", decoded.id);
      window.localStorage.setItem("userrole", decoded.role);
      alert("Login success!");
    })
    .catch(err => {
      alert("Invalid username or password");
      }

    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};


// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userId");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};