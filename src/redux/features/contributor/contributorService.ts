import axiosInstance from "@/utils/utils";

//fetch registered users
const fetchAllContributors = async() => {
    const response = await axiosInstance.get('/admin/contributors')
    console.log(response.data.data.data)
    return response.data.data.data
};


//singleUser
const getSingleContributor  = async(userId: unknown) => {
    const response = await axiosInstance.get(`/admin/contributors/${userId}/detail`)
    console.log(response.data.data)
    return response.data.data
};




const contributorService = {
    fetchAllContributors,
    getSingleContributor
};

export default contributorService;