import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // my backend server url as base url for each request
  withCredentials: true, // for cookies
});

// interceptor for Refresh Token
api.interceptors.response.use(
  (response) => response, // if no 401 then simply return what came from server

  async (error) => {
    const originalRequest = error.config; // this gives us the original request for api(url , method, headers)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // mark orignal request as tried so it doesn't keeps retrying

      await api.post("/auth/refresh"); // refresh teh access token

      return api(originalRequest); //  re-send the same request againa after refreshed access token
    }

    return Promise.reject(error); // this is where we can send error to UI to show if user is still unauthenticated or request in invalid
  },
);

export default api;
