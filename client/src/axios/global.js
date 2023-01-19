import axios from "axios";

const authFetch = axios.create({
  baseURL: "http://localhost:5000",
});

authFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location = "/login";
    }
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export default authFetch;
