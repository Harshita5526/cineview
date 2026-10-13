// src/api/axiosInstance.js

import axios from "axios";

const apiKey = "0f19fee237e45e7cffbe96734e7a85c0";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "en-US",
  },
});

export default api;