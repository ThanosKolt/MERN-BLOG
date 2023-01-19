import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/");
      setIsError(false);
    } catch (error) {
      setPassword("");
      setEmail("");
      setIsError(true);
      console.log(error.message);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1>Login</h1>
      <div className="row border rounded p-3 mt-4">
        <form>
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
          <button type="submit" className="btn btn-primary" onClick={onLogin}>
            Login
          </button>
          {isError && (
            <div className="alert alert-danger mt-3" role="alert">
              Wrong Credentials
            </div>
          )}
          <div className="row mt-3">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
