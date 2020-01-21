import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const SmallCard = ({ report, showViewReportButton = true }) => {
  const showViewButton = showViewReportButton => {
    return (
      showViewReportButton && (
        <Link to={`/report/${report._id}`} className="mr-2">
          <button className="btn btn-primary mt-2 mb-2">View Report</button>
        </Link>
      )
    );
  };
  return (
    <div className="card">
      <ShowImage item={report} url="report" />
      <div className="card-body">
        <h4 className="card-title" style={{ display: "inline-block" }}>
          {report.item}
        </h4>
        {report.status ? (
          <span className="badge badge-danger badge-pill align-top ml-1">
            Pending
          </span>
        ) : null}
        <p className="card-text">{report.description.substring(0, 100)}</p>
        <p className="black-9">
          <i className="fa fa-user mr-2" aria-hidden="true"></i> {report.author}
        </p>
        <p className="black-8">
          <i className="fa fa-plus-square mr-2" aria-hidden="true"></i>{" "}
          {moment(report.createdAt).format("dddd, MMMM D YYYY")}
        </p>
        {showViewButton(showViewReportButton)}
      </div>
    </div>
  );
};

export default SmallCard;
