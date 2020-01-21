import React from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../actions/authActions";
import { Link } from "react-router-dom";
import moment from "moment";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role, createdAt }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="list-group">
        <li className="list-group-item">
          <Link className="nav-link  a-custom" to="/create/report">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>Create
            Report
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link  a-custom" to={`/profile/${_id}`}>
            <i className="fa fa-user" aria-hidden="true"></i>Update Profile
          </Link>
        </li>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card">
        <div className="card-header">
          <i className="fa fa-info-circle" aria-hidden="true"></i>User
          Information
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <i className="fa fa-id-badge" aria-hidden="true"></i>
              Welcome! {name}
            </li>
            <li className="list-group-item">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
              {email}
            </li>
            <li className="list-group-item">
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              {role === 1 ? "Admin" : "Registered User"}
            </li>
            <li className="list-group-item">
              <i className="fa fa-sign-in" aria-hidden="true"></i>
              Log on {moment(createdAt).format("MMMM Do YYYY")}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container">
        <div className="row p-3" style={{ marginTop: "6em" }}>
          <div className="col-6 col-md-4">{userLinks()}</div>
          <div className="col-sm-6 col-md-8">{userInfo()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
