import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-darkGrey"></div>
    </div>
  );
};

export default LoadingSpinner;
