import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const { token } = useAuth();
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_DEV_API_ENDPOINT,
});
// const updateHeaderInterceptor = (axiosInstance) => {
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const jwtToken = "Bearer Token from Localstorage";
//       config.headers["Authorization"] = token;
//       return config;
//     },
//     (error) => {}
//   );
// };

// updateHeaderInterceptor(httpClient);
export default httpClient;
