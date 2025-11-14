import axios from "axios";

const VITE_EMPLOYEE_API = import.meta.env.VITE_EMPLOYEE_API;
const VITE_AUTH_API = import.meta.env.VITE_AUTH_API;

const _employeeApi = axios.create({
  baseURL: `${VITE_EMPLOYEE_API}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const _authApi = axios.create({
  baseURL: `${VITE_AUTH_API}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const employeeService = {
  registerEmployee: async (data) => {
    return await _employeeApi.post("/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  profileEmployee: async () => {
    return await _employeeApi.get("/profile");
  },
  loginEmployee: async (data) => {
    return await _authApi.post("/login", data);
  },
};

_authApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err) {
      originalRequest._isRetry = true;

      try {
        await _authApi.get(`/refresh`, {
          withCredentials: true,
        });

        return _authApi.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw err;
  }
);

export default employeeService;
