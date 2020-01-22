import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../actions/authActions";
import { Redirect, Link } from "react-router-dom";
import { read, update, updateUser } from "../actions/userActions";
import FormInput from "../components/form/FormInput";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false
  });

  const { token } = isAuthenticated();
  const { name, email, password, success } = values;

  const init = userId => {
    // console.log(userId);
    read(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId); // eslint-disable-next-line
  }, []);

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = e => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true
          });
        });
      }
    });
  };

  const redirectUser = success => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

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

  const profileUpdate = (name, email, password) => (
    <form>
      <FormInput
        label="Name"
        type="text"
        onChange={handleChange("name")}
        className="form-control"
        value={name}
      />

      <FormInput
        label="Email"
        type="email"
        onChange={handleChange("email")}
        className="form-control"
        value={email}
      />

      <FormInput
        label="Password"
        type="password"
        onChange={handleChange("password")}
        className="form-control"
        value={password}
      />

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  return (
    <Layout className="container">
      {goBack()}
      <div className="row p-3 shadow-sm bg-white" style={{ marginTop: "2em" }}>
        <div className="form-container">
          <h2 className="mb-4">Profile update</h2>
          {profileUpdate(name, email, password)}
          {redirectUser(success)}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
