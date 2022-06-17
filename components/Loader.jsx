import React from "react";

const Loader = ({ type = "button" }) => {
  return (
    <>
      {type.toLowerCase() === "button" ? (
        <div className="loader-button"></div>
      ) : (
        <div className="loader-normal"></div>
      )}
    </>
  );
};

export default Loader;
