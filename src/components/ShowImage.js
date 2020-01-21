import React from "react";
import { API } from "../config";
import DefaultImage from "../resources/images/blank.png";

const ShowImage = ({ item, url }) => {
  const photoUrl = item._id ? `${API}/${url}/photo/${item._id}` : DefaultImage;
  return (
    <>
      <img
        src={photoUrl}
        alt={item.item}
        className="card-img-top"
        style={{ height: "200px", width: "auto" }}
        onError={i => (i.target.src = `${DefaultImage}`)}
      />
    </>
  );
};

export default ShowImage;
