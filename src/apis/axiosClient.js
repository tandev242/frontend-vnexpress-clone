import axios from "axios";

const baseURL = {
  query: "http://localhost:7000/api",
  user: "http://localhost:5000/api",
  auth: "http://localhost:6000/api",
  comment: "http://localhost:8000/api",
  post: "http://localhost:4000/api",
}

const axiosInstance = axios.create({
  headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return error.response;
  }
);

export { axiosInstance, baseURL };
