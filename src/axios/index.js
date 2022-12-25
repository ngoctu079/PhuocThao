import axios from "axios";

//thực hiện request login lấy token
export const loginAxios = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 60000,
});

//request này cần mang theo token
export const requestData = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 60000,
});

//lấy token đính vào header trước khi tạo request
requestData.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
