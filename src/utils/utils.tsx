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


   // Function to highlight matches
  export const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

   const parts = text.split(new RegExp(`(${query})`, "gi"));
       return parts.map((part, i) =>
       part.toLowerCase() === query.toLowerCase() ? (
           <span key={i} className="bg-orange-300 text-white font-bold">
           {part}
           </span>
       ) : (
           part
       )
       );
};