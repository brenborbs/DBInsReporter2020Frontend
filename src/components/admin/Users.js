import React, { useState, useEffect } from "react";
import { allUsers } from "../../actions/userActions";
import { isAuthenticated } from "../../actions/authActions";
import Layout from "../../core/Layout";
import { Link } from "react-router-dom";
import Spinner from "../../core/Spinner";

// Bug styling: must center loading giff icon

const Users = () => {
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [values, setValues] = useState({ loading: false });

  const { loading } = values;

  const loadAllUsers = () => {
    setValues({ loading: true });
    allUsers().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues({ loading: false });
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const renderUsers = () => (
    <>
      {users.map((user, i) => (
        <tbody key={i}>
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role === 1 ? "Admin" : "Registered User"}</td>
          </tr>
        </tbody>
      ))}
    </>
  );

  const goBack = () => (
    <div className="back-btn">
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Link to="/admin/dashboard" className="text-db">
          <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>Back to
          Dashboard
        </Link>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Link to="/user/dashboard" className="text-db">
          <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>Back to
          Dashboard
        </Link>
      )}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="form-container">
        <Spinner />
      </div>
    );

  return (
    <Layout className="container">
      {goBack()}
      <div
        className="userList-wrapper p-3 shadow-sm bg-white"
        style={{ marginTop: "2em" }}
      >
        {showLoading()}
        <div className="form-container">
          <h2 cl="h2-cust">List of Users</h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            {renderUsers()}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
