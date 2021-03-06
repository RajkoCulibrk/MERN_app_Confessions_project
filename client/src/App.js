import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./screens/Home";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./screens/Register";
import { Container } from "react-bootstrap";
import Login from "./screens/Login";
import { login } from "./actions/userActions";
import {
  loadConfessions,
  resetConfessions,
} from "./actions/confessionsActions";
import SingleConfession from "./screens/SingleConfession";
import setAuthToken from "./utils/setAuthToken";

function App() {
  let {
    pagination: { page, sortOrder, sortBy },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  // when sortOrder,sortBy variables in redux store have been changed the confessions will be reset to [], new fetching of confessions will be initialized using newly set pagination sorting and filtering parameters. In the end NEXT_PAGE action will be dispatched on the next fetching se get the data for the next page.
  useEffect(() => {
    dispatch(resetConfessions());
    dispatch(loadConfessions({ page, sortOrder, sortBy }));
    dispatch({ type: "NEXT_PAGE" });
    // eslint-disable-next-line
  }, [sortOrder, sortBy, dispatch]);

  /// when the component first renders the axios default headers will be set ore removed depending if there is a token in the local storrage. Login action will be dispatched and user logged in or logged out if the token has expired.
  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    const caller = async () => {
      await dispatch(login());
      dispatch({
        type: "CLEAR_LOGIN_ERROR",
      });
    };

    caller();
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/confession/:id" component={SingleConfession} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
