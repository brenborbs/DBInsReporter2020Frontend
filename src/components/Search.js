import React, { useState, useEffect } from "react";
import { getCategories, list } from "../actions/reportActions";
// import Card from "./Card";
// import SmallCard from "./SmallCard";
import ReportList from "./ReportList";
import Spinner from "../core/Spinner";

// Now working. change name to item from server > controllers > listSearch query.item

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });
  const [values, setValues] = useState({
    loading: false
  });

  const { loading } = values;

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    setValues({ loading: true });
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
            setValues({ loading: false });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} report/s`;
    }
    if (searched && results.length < 1) {
      return `No reports found`;
    }
  };

  const searchedReports = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4 h2-cust">
          {searchMessage(searched, results)}
        </h2>

        <div className="row">
          {results.map((report, i) => (
            // <div className="col-4 mb-3" key={i}>
            //   <SmallCard key={i} report={report} />
            // </div>
            <div className="col-12" key={i}>
              <ReportList key={i} report={report} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">
            <i className="fa fa-search-plus" aria-hidden="true"></i>
          </button>
        </div>
      </span>
    </form>
  );

  const showLoading = () =>
    loading && (
      <div className="container-fluid mb-3 bg-white">
        <Spinner />
      </div>
    );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      {showLoading()}
      <div className="container-fluid mb-3">{searchedReports(results)}</div>
    </div>
  );
};

export default Search;
