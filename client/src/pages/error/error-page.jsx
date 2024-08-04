import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <div className="flex flex-col gap-2 items-center">
        <h3>Some Error Occured Please Try Again</h3>
        <button onClick={() => location.reload()}>Refresh Page</button>
      </div>
    </div>
  );
};

export default ErrorPage;
