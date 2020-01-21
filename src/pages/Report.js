import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import Card from "../components/Card";
import { getCategories, getFilteredReports } from "../actions/reportActions";
import Checkbox from "../components/Checkbox";
import Spinner from "../core/Spinner";

const Report = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [] }
  });

  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [values, setValues] = useState({ loading: false });

  const { loading } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    setValues({ loading: true });
    getFilteredReports(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
        setValues({ loading: false });
      }
    });
  };

  const loadMore = () => {
    setValues({ loading: true });
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredReports(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
        setValues({ loading: false });
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-primary mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters); // eslint-disable-next-line
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("REPORT", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const showLoading = () =>
    loading && (
      <div className="row p-3 my-3 shadow-sm bg-white">
        <Spinner />
      </div>
    );

  return (
    <Layout className="container">
      <div className="search-wrapper">
        <div className="row">
          <div className="col-4">
            <h4 className="h2-cust">
              <i
                className="fa fa-check-square-o mr-2"
                aria-hidden="true"
                style={{ fontSize: "18px" }}
              ></i>
              Filter by categories
            </h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
            </ul>
          </div>

          <div className="col-8">
            <h2 className="mb-2 h2-cust">
              <i
                className="fa fa-list-alt mr-2"
                aria-hidden="true"
                style={{ fontSize: "30px" }}
              ></i>
              Reports
            </h2>
            {showLoading()}
            <div className="row p-3 my-3 shadow-sm bg-white">
              {filteredResults.map((report, i) => (
                <div key={i} className="col-4 mb-3">
                  <Card report={report} />
                </div>
              ))}
            </div>
            <hr />
            {showLoading()}
            {loadMoreButton()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
