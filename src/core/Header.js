import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../actions/authActions";

// Bootstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
  // NavLink
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#d33821" };
  } else {
    return { color: "#ffffff" };
  }
};

const Header = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar className="navbar navbar-expand-md fixed-top navbar-dark shadow-sm">
        <NavbarBrand>
          <i
            className="fa fa-database mr-2"
            aria-hidden="true"
            style={{ fontSize: "20px" }}
          ></i>
          My reports
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <>
            <Nav className="navbar-nav ml-auto">
              {isAuthenticated() && (
                <>
                  <NavItem>
                    <Link
                      to="/"
                      className="nav-link t-cust"
                      style={isActive(history, "/")}
                    >
                      Reports
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link
                      to="/report"
                      className="nav-link t-cust"
                      style={isActive(history, "/report")}
                    >
                      Search
                    </Link>
                  </NavItem>
                </>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <NavItem>
                  <Link
                    to="/user/dashboard"
                    className="nav-link t-cust"
                    style={isActive(history, "/user/dashboard")}
                  >
                    User Dashboard
                  </Link>
                </NavItem>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <>
                  <NavItem>
                    <Link
                      to="/admin/dashboard"
                      className="nav-link t-cust"
                      style={isActive(history, "/admin/dashboard")}
                    >
                      Admin Dashboard
                    </Link>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="navbar-nav ml-auto">
              {!isAuthenticated() && (
                <>
                  <NavItem>
                    <Link
                      to="/signin"
                      className="btn btn-outline-success e-cust"
                    >
                      Signin
                    </Link>
                  </NavItem>
                </>
              )}
              {isAuthenticated() && (
                <NavItem>
                  <button
                    className="btn btn-outline-success e-cust"
                    onClick={() =>
                      signout(() => {
                        history.push("/signin");
                      })
                    }
                  >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>Logout
                  </button>
                </NavItem>
              )}
            </Nav>
          </>
        </Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(Header);
