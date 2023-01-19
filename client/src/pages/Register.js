import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const onRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        username,
        email,
        password,
      });
      setIsSuccess(true);
    } catch (error) {
      setPassword("");
      setEmail("");
      setIsError(true);
      console.error(error.response.data);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1>Register</h1>
      <div className="row border rounded p-3 mt-4">
        <form onSubmit={onRegister}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="exampleInputUsername"
              aria-describedby="usernameHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {isError && (
            <div className="alert alert-danger mt-3" role="alert">
              Wrong Credentials
            </div>
          )}
          {isSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              User Registered
            </div>
          )}
          <div className="row mt-3">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
