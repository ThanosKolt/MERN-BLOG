import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import authFetch from "../axios/global";
const Searchbar = () => {
  const { currentUser, input, setInput } = useGlobalContext();
  const [result, setResult] = useState([]);
  const handleKeyUp = async (e) => {
    if (input) {
      try {
        const { data } = await authFetch.post("/friends/search", { input });
        setResult(data.result);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setResult([]);
    }
  };

  return (
    <div className="d-flex flex-column">
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </form>
      {input && result.length > 0 ? (
        <div className="dropdown ">
          <ul
            className="dropdown-menu show p-3 d-flex flex-column w-75"
            data-bs-popper="static"
          >
            {result.map((user, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`/${user._id}`}
                    className="dropdown-item p-3 text-capitalize rounded d-flex justify-content-between align-items-center"
                  >
                    {user.username}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Searchbar;
