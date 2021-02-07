import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const login = () => async (dispatch) => {
  console.log("login function");
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

export const authenticate = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth", { email, password });
    const token = data.token;
    localStorage.setItem("token", token);
    console.log(token);
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};
