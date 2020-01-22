import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../actions/authActions";
import { Link, Redirect } from "react-router-dom";
import { createReport, getCategories } from "../../actions/adminActions";
// Inputs
import InputGroup from "../../components/form/InputGroup";
import TextArea from "../../components/form/textArea";
import PhotoInput from "../../components/form/PhotoInput";

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
    formData: "",
    success: false
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
    formData,
    success
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
          createdReport: data.name,
          success: true
        });
      }
    });
  };

  const redirectUser = success => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

  const newPostForm = () => (
    <form onSubmit={clickSubmit}>
      <PhotoInput
        label="Photo"
        onChange={handleChange("photo")}
        type="file"
        name="photo"
        accept="image/*"
      />

      <hr />
      <div className="form-row">
        <InputGroup
          label="Item"
          onChange={handleChange("item")}
          type="text"
          className="form-control"
          value={item}
          placeholder="Item name"
        />

        <InputGroup
          label="Project"
          onChange={handleChange("project")}
          type="text"
          className="form-control"
          value={project}
          placeholder="Project name"
        />

        <InputGroup
          label="Author"
          onChange={handleChange("author")}
          type="text"
          className="form-control"
          value={author}
          placeholder="Author"
        />

        <InputGroup
          label="Contractor"
          onChange={handleChange("contractor")}
          type="text"
          className="form-control"
          value={contractor}
          placeholder="Contractor name"
        />

        <InputGroup
          label="Date Inspected"
          onChange={handleChange("dateIns")}
          type="text"
          className="form-control"
          value={dateIns}
          placeholder="YYYY/MM/DD"
        />
      </div>
      <hr />
      <div className="form-group">
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

        <div className="form-group">
          <label>Status</label>
          <select onChange={handleChange("status")} className="form-control">
            <option>Please select</option>
            <option value="0">Pending</option>
            <option value="1">Complete</option>
          </select>
        </div>
        <hr />

        <TextArea
          label="Subject"
          onChange={handleChange("subject")}
          type="text"
          className="form-control"
          value={subject}
          rows="5"
        />

        <TextArea
          label="Description"
          onChange={handleChange("description")}
          type="text"
          className="form-control"
          value={description}
          rows="5"
        />

        <TextArea
          label="Action"
          onChange={handleChange("action")}
          type="text"
          className="form-control"
          value={action}
          rows="5"
        />

        <TextArea
          label="Remarks"
          onChange={handleChange("remarks")}
          type="text"
          className="form-control"
          value={remarks}
          rows="5"
        />

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
          {redirectUser(success)}
        </div>
      </div>
    </Layout>
  );
};

export default AddReport;
