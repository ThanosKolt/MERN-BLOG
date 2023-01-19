import React from "react";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { useEffect } from "react";
import { Modal } from "./Modal";
const Navbar = () => {
  const { currentUser, fetchCurrentUser } = useGlobalContext();
  const onLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <nav className="navbar sticky-top bg-white border-bottom px-4 py-3">
      <div className="navbar-brand d-flex align-items-center" href="/">
        <Link to="/" className="text-decoration-none link-dark">
          Welcome,
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-lg dropdown-toggle text-capitalize p-0 border-0 px-1"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {currentUser.username}
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to={`/${currentUser._id}`}>
                Profile
              </Link>
            </li>
            <li>
              <a
                className="dropdown-item text-danger"
                href="/login"
                onClick={onLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Searchbar />
      {/* button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Write a post
      </button>
    </nav>
  );
};

export default Navbar;
