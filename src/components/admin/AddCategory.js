import React, { useState } from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { createCategory } from "../../actions/adminActions";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <div className="alert alert-success">{name} is created</div>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className="alert alert-danger">Category should be unique</div>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-db">
        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>Back to
        Dashboard
      </Link>
    </div>
  );
  return (
    <Layout className="container">
      <div className="row p-5 shadow-sm bg-white" style={{ marginTop: "6em" }}>
        <div className="form-container">
          <h2>Add Category</h2>
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
