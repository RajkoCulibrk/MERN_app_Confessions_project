import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducers";
import {
  confessionReducer,
  singleConfessionReducer,
} from "./reducers/confessionsReducer";
import { commentReducer, subcommentReducer } from "./reducers/commentsReducers";
import paginationReducer from "./reducers/paginationReducer";
const reducer = combineReducers({
  user: userReducer,
  confessionsList: confessionReducer,
  singleConfession: singleConfessionReducer,
  commentsList: commentReducer,
  subCommentsList: subcommentReducer,
  page: paginationReducer,
});
const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  user: {
    userInfo: user,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
