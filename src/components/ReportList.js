import React from "react";
import { Link } from "react-router-dom";
// import ShowImage from "./ShowImage";
import moment from "moment";

const ReportList = ({ report }) => {
  return (
    <Link to={`/report/${report._id}`} style={{ color: "black" }}>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <strong>{report.item}</strong>
          <span className="ml-5">{report.contractor}</span>
          <span className="ml-5">
            Added on {moment(report.createdAt).format("MMMM D YYYY")}
          </span>
          <span className="ml-5">
            {report.status ? (
              <span className="badge badge-danger">Pending</span>
            ) : null}
          </span>
          <span className="badge badge-pill badge-secondary ml-5">
            {report.category && report.category.name}
          </span>
          <span className="ml-5">{report.author}</span>
        </li>
      </ul>
    </Link>
  );
};

export default ReportList;
