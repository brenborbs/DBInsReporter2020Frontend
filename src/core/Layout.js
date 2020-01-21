import React from "react";
import Header from "./Header";

const Layout = ({
  // title = "Title",
  // description = "Description",
  className,
  children
}) => {
  return (
    <>
      <Header />
      {/* <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div> */}
      <div className={className}>{children}</div>
    </>
  );
};

export default Layout;
