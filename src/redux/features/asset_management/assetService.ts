import axiosInstance from "@/utils/utils";

//fetch assets
const fetchAssets = async(query: string) => {
    const response = await axiosInstance.get(`/admin/assets?status=${query}`)
    return response.data.data.data
};

//assets details
const assetDetails  = async(id: unknown) => {
    const response = await axiosInstance.get(`/admin/assets/${id}/detail`)
    return response.data.data
};

//assets details
// const updateStatus  = async(id: number, status:string) => {
//     const response = await axiosInstance.post(`/admin/assets/${id}/update-status`, status)
//     return response.data.data
// };


const assetService = {
    fetchAssets,
    assetDetails,
    // updateStatus
};

export default assetService;