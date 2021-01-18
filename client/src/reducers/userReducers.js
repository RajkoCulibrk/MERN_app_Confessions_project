import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
export const userReducer = (state = { error: [] }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return { error: [], loading: false };
    case "SET_ERROR":
      return { loading: false, error: action.payload };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: [],
      };

    default:
      return state;
  }
};
