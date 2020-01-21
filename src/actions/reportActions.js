import { API } from "../config";
import queryString from "query-string";

export const getReports = sortBy => {
  return fetch(`${API}/reports?sortBy=${sortBy}&order=desc&limit=50`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getFilteredReports = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };
  return fetch(`${API}/reports/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const list = params => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`${API}/reports/search?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const read = reportId => {
  return fetch(`${API}/report/${reportId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listRelated = reportId => {
  return fetch(`${API}/reports/related/${reportId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
