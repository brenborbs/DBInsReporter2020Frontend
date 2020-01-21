import React from "react";
import ShowImage from "./ShowImage";
import moment from "moment";

const Details = ({ report }) => {
  return (
    <div className="report-wrapper">
      <div className="title-wrapper">
        <h4 className="title-report">Inspection Report</h4>
        {report.status ? (
          <span className="badge badge-danger badge-pill align-top ml-1">
            Pending
          </span>
        ) : null}
      </div>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Project</th>
            <th scope="col">Category</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.item}</td>
            <td>{report.project}</td>
            <td>{report.category && report.category.name}</td>
            <td>{report.author}</td>
          </tr>
        </tbody>
        <thead className="thead-light">
          <tr>
            <th scope="col">Encoded</th>
            <th scope="col">Subject</th>
            <th scope="col">Contractor</th>
            <th scope="col">Inspection Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{moment(report.createAt).format("YYYY/MM/DD")}</td>
            <td>{report.subject}</td>
            <td>{report.contractor}</td>
            <td>{report.dateIns}</td>
          </tr>
        </tbody>
      </table>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.description}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.action}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.remarks}</td>
          </tr>
        </tbody>
      </table>
      <div className="detail-img">
        <ShowImage item={report} url="report" />
      </div>
    </div>
  );
};

export default Details;
