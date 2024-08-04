import React from "react";

const NotFoundPage = () => {
  return (
    <div className="px-5 pt-4 flex flex-col text-center gap-5">
      <h2 className="text-xl">Sorry, this page isn't available.</h2>
      <p className="text-md font-thin">
        The link you followed may be broken, or the page may have been removed.
        Go back to Instagram.
      </p>
    </div>
  );
};

export default NotFoundPage;
