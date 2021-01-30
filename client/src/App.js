import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./screens/Home";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./screens/Register";
import { Container } from "react-bootstrap";
import Login from "./screens/Login";
import { login } from "./actions/userActions";
import { loadConfessions } from "./actions/confessionsActions";
import SingleConfession from "./screens/SingleConfession";
import setAuthToken from "./utils/setAuthToken";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    const caller = async () => {
      await dispatch(login());
      dispatch({
        type: "CLEAR_ERROR",
      });
    };
    dispatch(loadConfessions());
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
