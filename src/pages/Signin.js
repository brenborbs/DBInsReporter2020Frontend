import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../actions/authActions";
import FormInput from "../components/form/FormInput";

const Signin = () => {
  const [values, setValues] = useState({
    email: "brennon@test.com",
    password: "123456",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };
  const signUpForm = () => (
    <form>
      <FormInput
        label="Email address"
        onChange={handleChange("email")}
        type="email"
        className="form-control"
        value={email}
      />

      <FormInput
        label="Password"
        onChange={handleChange("password")}
        type="password"
        className="form-control"
        value={password}
      />

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      // title="Signin"
      // description="Please signin with your account"
      className="container"
    >
      <div className="row">
        <div className="col">
          <div className="signin-wrapper">
            <div className="signin-title">
              <h1>
                <i
                  className="fa fa-lock mr-2"
                  aria-hidden="true"
                  style={{ fontSize: "40px" }}
                ></i>
                Log In
              </h1>
            </div>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            <p className="mt-2 text-muted text-center">
              {" "}
              Copyright © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
