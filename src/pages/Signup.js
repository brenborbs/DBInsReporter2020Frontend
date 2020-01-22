import React, { useState } from "react";
import Layout from "../core/Layout";
import { signup } from "../actions/authActions";
import FormInput from "../components/form/FormInput";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <FormInput
        label="Name"
        onChange={handleChange("name")}
        type="text"
        className="form-control"
        value={name}
      />

      <FormInput
        label="Email"
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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created
    </div>
  );

  return (
    <Layout className="container">
      <div className="row p-4 shadow-sm bg-white" style={{ marginTop: "6em" }}>
        <div className="form-container">
          <h2>Create New User</h2>
          {showSuccess()}
          {showError()}
          {signUpForm()}
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
