import axiosInstance from "@/utils/utils";

//login
const login = async(userData: unknown) => {
    const response = await axiosInstance.post('/login', userData)
    console.log(response.data.token)
    return response.data.token
};


const authService = {
    login
};

export default authService;