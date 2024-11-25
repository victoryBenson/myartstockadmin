'use-client'

import axiosInstance from "@/utils/utils";



//fetch admin data
const fetchAdminDashboardData  = async() => {
  const response = await axiosInstance.get('/admin/dashboard')
  console.log(response.data)
  return response?.data?.products 
};

const AdminDashboardData = {
  fetchAdminDashboardData
}

export default AdminDashboardData;