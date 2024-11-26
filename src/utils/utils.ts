import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://staging.pekadis.com',
});


axiosInstance.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


//truncate text
export const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;