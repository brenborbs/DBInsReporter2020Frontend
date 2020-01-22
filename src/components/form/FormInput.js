import React from "react";

const FormInput = ({ onChange, placeholder, value, label, type }) => {
  return (
    <div className="form-group">
      <label className="text-muted">{label}</label>
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

export default FormInput;
