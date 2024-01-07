import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import NotFound from "../Pages/404.jsx";
import Detail from "../Pages/Detail.jsx";
import Category from "../Pages/Category.jsx";
import Search from "../Pages/Search.jsx";

const Web = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/buku/:slug" element={<Detail />} exact="" />
      <Route path="/category/:category" element={<Category />} exact="" />
      <Route path="/search/:keyword" element={<Search />} exact="" />
    </Routes>
  );
};

export default Web;
