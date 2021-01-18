import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { authenticated, loading, userInfo } = user;
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/">Confessions</Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {userInfo ? (
              <Button
                variant="outline-light"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            ) : (
              <>
                {" "}
                <Link to="/login">
                  {" "}
                  <Button variant="outline-light">Login</Button>
                </Link>
                <Link to="/Register">
                  {" "}
                  <Button variant="outline-light">Register</Button>
                </Link>
              </>
            )}
            {authenticated}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
