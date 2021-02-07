import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

//loggs in the user by taking the authentication token from the localStorage receives back the informations about the user sets them in the redux store. Sets loading to true while fetching and back to false when fetched so that the spinner component can be displayed to the user. Sets the user info to the local storage.
export const login = () => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/auth", config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    dispatch(setAlert(errorMessage));
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  }
};

// send the password and the email provide by the user to be authenticated and if so receives JSON WEB TOKEN needed for acccesing private routes, and sets the token in the local storage. if the data provided is dose not match or if there is some other error dispatches set error for a error message to be displayed
export const authenticate = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth", { email, password });
    const token = data.token;
    localStorage.setItem("token", token);

    if (localStorage.token) {
      dispatch(login());
    }
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    dispatch(setAlert(errorMessage));
  }
};

// adds error to the error aray for each error error component will be displayed and removed after 5 seconds because the CLEAR_LOGIN_ERROR action will be dispatched after 5 seconds
export const setAlert = (text) => async (dispatch) => {
  dispatch({
    type: "SET_LOGIN_ERROR",
    payload: text,
  });
  let errTimeout;
  clearTimeout(errTimeout);
  errTimeout = setTimeout(() => {
    dispatch({
      type: "CLEAR_LOGIN_ERROR",
    });
  }, 5000);
};

// sends data needed for creating a new user to the server receives back a JSON WEB TOKEN and stores it in the local storage than dispatches the login action for user to be logged in ath the information about the user can be fetched. In case of error dispatches set error.
export const register = (email, password, name) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users", { password, name, email });
    const token = data.token;
    localStorage.setItem("token", token);
    dispatch(login());
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    dispatch(setAlert(errorMessage));
    localStorage.removeItem("token");
  }
};

// for logging the user out simply removes the token, and userInfo from the local storage
export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};
