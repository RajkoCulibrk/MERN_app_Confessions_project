import React, { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register, setAlert } from "../actions/userActions";
import { Redirect } from "react-router-dom";
const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      dispatch(register(email, password, name));
    } else {
      dispatch(setAlert("Passwords do not match!"));
    }
  };
  const user = useSelector((state) => state.user);
  const { error, loading, userInfo } = user;
  return (
    <Form
      className="text-light login-register ml-auto mr-auto mt-5 pt-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center">Register</h2>
      {userInfo && <Redirect to="/" />}
      {loading && <Spinner animation="border" variant="primary" />}

      {error?.length > 1 && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(e) => setname(e.target.value)}
          value={name}
          type="text"
          placeholder="Username"
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          placeholder="Email"
        />
        <Form.Text className="text-light">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          name="password"
          minLength={6}
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          name="password2"
          placeholder="Confirm password"
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

export default Register;
