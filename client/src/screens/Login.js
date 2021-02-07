import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../actions/userActions";
import { Redirect } from "react-router-dom";
import SpinnerComonent from "../components/Spinner";
import Error from "../components/Error";
const Login = () => {
  const { user, errors } = useSelector((state) => state);
  const { error, loading, userInfo } = user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(authenticate(email, password));
  };

  return (
    <Form
      className="text-light login-register ml-auto mr-auto mt-5 pt-5 "
      onSubmit={submitHandler}
    >
      <h2 className="text-center">Login</h2>
      {userInfo && <Redirect to="/" />}
      {loading && <SpinnerComonent />}
      {errors.map((error) => (
        <Error key={error.id} error={error} />
      ))}
      {error?.length > 1 && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>

      <Button
        className="background-main text-light"
        variant="outline-light"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default Login;
