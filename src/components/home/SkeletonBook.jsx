import React from "react";

const SkeletonBook = () => {
  return (
    <div className="h-screen">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 animate-pulse">
        <div className="h-72 bg-gray-200"></div>
        <div className="h-72 bg-gray-200"></div>
        <div className="h-72 bg-gray-200"></div>
        <div className="h-72 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SkeletonBook;
