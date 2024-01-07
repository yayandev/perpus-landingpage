import React from "react";
import { useParams } from "react-router-dom";

const OrderByCategory = () => {
  const category = useParams().category;
  return (
    <div>
      <h1>{category}</h1>
    </div>
  );
};

export default OrderByCategory;
