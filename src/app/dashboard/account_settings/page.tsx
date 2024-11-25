import { redirect } from 'next/navigation'

const Page = () => {
  return (
   redirect(`/dashboard/account_settings/customer`)
  )
}

export default Page