import axios from "axios";

// takes  the token from the local storage if on exists there and sets the axios default headders needed for accesing protected routes, else removes the headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
