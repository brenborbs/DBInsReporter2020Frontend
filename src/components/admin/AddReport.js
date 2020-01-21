import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { createReport, getCategories } from "../../actions/adminActions";

// Bugs: Cannot show success message and after submitting, photo is not empty

const AddReport = () => {
  const [values, setValues] = useState({
    item: "",
    dateIns: "",
    project: "",
    author: "",
    subject: "",
    remarks: "",
    action: "",
    description: "",
    contractor: "",
    categories: [],
    photo: "",
    loading: false,
    error: "",
    createdReport: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();
  const {
    item,
    project,
    author,
    subject,
    remarks,
    action,
    dateIns,
    description,
    contractor,
    categories,
    loading,
    error,
    createdReport,
    formData
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init(); // eslint-disable-next-line
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createReport(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          item: "",
          dateIns: "",
          project: "",
          author: "",
          subject: "",
          remarks: "",
          action: "",
          photo: "",
          description: "",
          contractor: "",
          loading: false,
          createdReport: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-row">
        <label>Photo</label>
        <div className="input-group mb-3">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>
      </div>
      <hr />
      <div className="form-row">
        <div className="col">
          <label>Item</label>
          <input
            onChange={handleChange("item")}
            type="text"
            className="form-control"
            value={item}
            placeholder="Item name"
          />
        </div>
        <div className="col">
          <label>Project</label>
          <input
            onChange={handleChange("project")}
            type="text"
            className="form-control"
            value={project}
            placeholder="Project name"
          />
        </div>
        <div className="col">
          <label>Author</label>
          <input
            onChange={handleChange("author")}
            type="text"
            className="form-control"
            value={author}
            placeholder="Author"
          />
        </div>
        <div className="col">
          <label>Contractor</label>
          <input
            onChange={handleChange("contractor")}
            type="text"
            className="form-control"
            value={contractor}
            placeholder="Contractor name"
          />
        </div>
        <div className="col">
          <label>Date Inspected</label>
          <input
            onChange={handleChange("dateIns")}
            type="text"
            className="form-control"
            value={dateIns}
            placeholder="YYYY/MM/DD"
          />
        </div>
      </div>
      <hr />
      <div className="col">
        <label>Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="col">
        <label>Status</label>
        <select onChange={handleChange("status")} className="form-control">
          <option>Please select</option>
          <option value="0">Pending</option>
          <option value="1">Complete</option>
        </select>
      </div>
      <hr />
      <div className="col">
        <label>Subject</label>
        <textarea
          onChange={handleChange("subject")}
          type="text"
          className="form-control"
          value={subject}
          rows="5"
        ></textarea>
      </div>
      <div className="col">
        <label>Description</label>
        <textarea
          onChange={handleChange("description")}
          type="text"
          className="form-control"
          value={description}
          rows="5"
        ></textarea>
      </div>
      <div className="col">
        <label>Action</label>
        <textarea
          onChange={handleChange("action")}
          type="text"
          className="form-control"
          value={action}
          rows="5"
        ></textarea>
      </div>
      <div className="col">
        <label>Remarks</label>
        <textarea
          onChange={handleChange("remarks")}
          type="text"
          className="form-control"
          value={remarks}
          rows="5"
        ></textarea>
        <button className="btn btn-primary btn-block mt-4">Submit</button>
      </div>
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
      style={{ display: createdReport ? "" : "none" }}
    >
      <h2>{`${createdReport}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
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

  return (
    <Layout className="container">
      {goBack()}
      <div className="row p-5 my-3 shadow-sm bg-white">
        <div className="form-container ">
          <h2 className="form-text-label">Inspection Form</h2>
          <hr />
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddReport;
