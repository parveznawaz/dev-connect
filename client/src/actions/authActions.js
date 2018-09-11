import axios from "axios";
import { GET_ERROR } from "./types";

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
