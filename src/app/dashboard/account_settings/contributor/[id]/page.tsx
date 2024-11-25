'use client'
import { redirect } from "next/navigation";
import React from "react";

const ContributorDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params)
  
  return (
    redirect(`/dashboard/account_settings/contributor/${id}/contents`)
  );
};

export default ContributorDetails;
