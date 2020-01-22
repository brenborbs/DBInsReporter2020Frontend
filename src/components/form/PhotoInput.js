import React from "react";

const PhotoInput = ({ onChange, accept, name, label, type }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group mb-3">
        <label className="btn btn-secondary">
          <input onChange={onChange} type={type} name={name} accept={accept} />
        </label>
      </div>
    </div>
  );
};

export default PhotoInput;
