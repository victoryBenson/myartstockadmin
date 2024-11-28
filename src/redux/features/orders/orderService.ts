import axiosInstance from "@/utils/utils";

//fetch orders
const fetchOrders = async() => {
    const response = await axiosInstance.get('/admin/orders')
    console.log(response.data.data.data)
    return response.data.data.data
};




const orderService = {
    fetchOrders
};

export default orderService;