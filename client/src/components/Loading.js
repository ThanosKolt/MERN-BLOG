import React from "react";

const Loading = () => {
  return (
    <div className="container-fluid h-100 bg-light">
      <div className="row justify-content-center pt-5">
        <div className="col-auto">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
