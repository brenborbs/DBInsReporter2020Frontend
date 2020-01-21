import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getReports } from "../actions/reportActions";
import Search from "../components/Search";
// import Card from "../components/Card";
import ReportList from "../components/ReportList";
import Spinner from "../core/Spinner";

const Home = () => {
  const [reportsByArrival, setReportsByArrival] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [values, setValues] = useState({ loading: false });

  const { loading } = values;

  const loadReportsByArrival = () => {
    setValues({ loading: true });
    getReports("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues({ loading: false });
        setReportsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadReportsByArrival();
  }, []);

  const showLoading = () =>
    loading && (
      <div className="col-12">
        <Spinner />
      </div>
    );

  return (
    <Layout className="container">
      <div className="home-wrapper">
        <Search />
        <h2 className="mb-4 h2-cust">
          <i
            className="fa fa-list-alt mr-2"
            aria-hidden="true"
            style={{ fontSize: "30px" }}
          ></i>
          Latest Reports
        </h2>

        <div className="row shadow-sm my-3 p-3 rounded bg-white">
          {showLoading()}
          {reportsByArrival.map((report, i) => (
            // <div key={i} className="col-4 mb-3">
            //   <Card report={report} />
            // </div>
            <div key={i} className="col-12">
              <ReportList report={report} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
