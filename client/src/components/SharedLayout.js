import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Modal from "./Modal";
const SharedLayout = () => {
  return (
    <div className="bg-light">
      <Navbar />
      <Modal />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
