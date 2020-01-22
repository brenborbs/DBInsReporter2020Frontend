import React from "react";

const textArea = ({ onChange, placeholder, value, label, type, rows }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        className="form-control"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export default textArea;
