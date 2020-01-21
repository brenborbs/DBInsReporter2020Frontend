import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { getReports, deleteReport } from "../../actions/adminActions";
import moment from "moment";

// Add alert or confirm textbox at delete function

const ManageReports = () => {
  const [reports, setReports] = useState([]);

  const { user, token } = isAuthenticated();

  const loadReports = () => {
    getReports().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setReports(data);
      }
    });
  };

  const destroy = reportId => {
    deleteReport(reportId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadReports();
      }
    });
  };

  useEffect(() => {
    loadReports();
  }, []);

  const deleteConfirm = reportId => {
    let answer = window.confirm("Are you sure you want to delete this report?");
    if (answer) {
      destroy(reportId);
    }
  };

  return (
    <Layout className="container">
      <div className="row">
        <div className="col-12" style={{ marginTop: "5em" }}>
          <h2 className="text-center">Total {reports.length} reports</h2>
          <hr />
          <ul className="list-group">
            {reports.map((r, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{r.item}</strong>
                {r.status ? (
                  <span className="badge badge-danger badge-pill">Pending</span>
                ) : null}
                <p>{moment(r.createdAt).format("MMMM D YYYY h:mm:ss a")}</p>
                <Link to={`/admin/report/update/${r._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <i
                  className="fa fa-trash-o"
                  aria-hidden="true"
                  onClick={() => deleteConfirm(r._id)}
                  style={{ cursor: "pointer" }}
                ></i>
                {/* <span
                  onClick={() => destroy(r._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span> */}
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageReports;
