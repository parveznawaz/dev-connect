import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERROR, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispacth => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispacth({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispacth => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Saveto localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispacth(setCurrentUser(decoded));
    })
    .catch(err =>
      dispacth({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const setCurrentUser =  (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}


// Log user out
