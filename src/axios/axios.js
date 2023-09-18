import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "content-type": "application/json"
  },
});

export default instance;
