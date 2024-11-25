'use client'
import React from 'react'
import { redirect } from "next/navigation";

const VendorDetails = ({ params }: { params: Promise<{ id: string } >}) => {
    const { id } = React.use(params)
  
  return (
    redirect(`/dashboard/account_settings/vendor/${id}/contents`)
  );
};

export default VendorDetails;
