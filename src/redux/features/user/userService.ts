import axiosInstance from "@/utils/utils";

//fetch registered users
const fetchRegisteredUsers = async() => {
    const response = await axiosInstance.get('/admin/users')
    console.log(response.data.data.data)
    return response.data.data.data
};


//singleUser
const getSingleUser  = async(userId: unknown) => {
    const response = await axiosInstance.get(`/admin/users/${userId}/detail`)
    console.log(response.data.data)
    return response.data.data
};




const userService = {
    fetchRegisteredUsers,
    getSingleUser
};

export default userService;