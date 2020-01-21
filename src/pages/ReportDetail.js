import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { read, listRelated } from "../actions/reportActions";
import { isAuthenticated } from "../actions/authActions";
// import Card from "../components/Card";
import Details from "../components/Details";
import ReportList from "../components/ReportList";
import Spinner from "../core/Spinner";

// kendo pdf
// import { PDFExport } from "@progress/kendo-react-pdf";

const ReportDetail = props => {
  const [report, setReport] = useState({});
  const [relatedReport, setRelatedReport] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [values, setValues] = useState({ loading: false });

  const { loading } = values;

  const loadSingleReport = reportId => {
    setValues({ loading: true });
    read(reportId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setReport(data);
        // fetch related reports
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedReport(data);
            setValues({ loading: false });
          }
        });
      }
    });
  };

  useEffect(() => {
    const reportId = props.match.params.reportId;
    loadSingleReport(reportId);
  }, [props]);

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

  const showLoading = () =>
    loading && (
      <div className="row shadow-sm bg-white">
        <Spinner />
      </div>
    );

  return (
    <Layout className="container">
      <div className="row">
        {goBack()}

        <div className="report-container">
          {showLoading()}
          <div className="row shadow-sm bg-white">
            <Details report={report} />
          </div>
        </div>

        <div className="col-12 mt-5" style={{ marginBottom: "5em" }}>
          <h2 className="h2-cust">Related Reports</h2>
          {relatedReport.map((r, i) => (
            <div key={i}>
              <ReportList key={i} report={r} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReportDetail;
