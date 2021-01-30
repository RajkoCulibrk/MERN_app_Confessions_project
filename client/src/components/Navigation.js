import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { authenticated, userInfo } = user;
  return (
    <div>
      <Navbar className="navbar" collapseOnSelect expand="lg">
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
                <Link className="ml-auto mr-2" to="/login">
                  {" "}
                  <Button variant="outline-light">Login</Button>
                </Link>
                <Link className="ml-auto mr-2" to="/Register">
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
