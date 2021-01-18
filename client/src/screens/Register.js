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
    <Form onSubmit={handleSubmit}>
      {userInfo && <Redirect to="/" />}
      {loading && <Spinner animation="border" variant="primary" />}

      {error?.length > 1 && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicPassword">
        <Form.Label>name</Form.Label>
        <Form.Control
          onChange={(e) => setname(e.target.value)}
          value={name}
          type="text"
          placeholder="name"
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
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
          placeholder="Confirm password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
