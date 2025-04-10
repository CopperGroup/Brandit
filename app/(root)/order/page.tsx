import React from 'react'
import CreateOrder from '@/components/forms/CreateOrder'
import { getSession } from '@/lib/getServerSession'
import { fetchUserByEmail } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Checkout"
}

const Page = async () => {

    const email = await getSession();

    const user = await fetchUserByEmail({email});

  return (
    <section>
        <CreateOrder userId={user?._id || ""} email={email}/>
    </section>
  )
}

export default Page;