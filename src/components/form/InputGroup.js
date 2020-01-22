import React from "react";

const InputGroup = ({ onChange, placeholder, value, label, type }) => {
  return (
    <div className="col">
      <label>{label}</label>
      <input
        className="form-control"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputGroup;
