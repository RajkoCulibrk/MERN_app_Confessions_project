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

function App() {
  const dispatch = useDispatch();
  const caller = async () => {
    await dispatch(login());
    dispatch({
      type: "CLEAR_ERROR",
    });
  };

  useEffect(() => {
    caller();
  }, [dispatch, caller]);
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
