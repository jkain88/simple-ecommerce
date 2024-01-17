'use client'

import AddressDetailForm from '@/components/forms/AddressDetailForm'
import { addresses } from '@/constants/testData'
import { Api } from '@/lib/Api'
import { useQuery } from '@tanstack/react-query'
import { MoveLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AddressDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const { data: address, isLoading } = useQuery({
    queryKey: ['address', params.id],
    queryFn: async () => {
      const api = new Api()
      return api.users.usersAddressesRead(params.id, {
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
    },
    enabled: session?.token !== undefined,
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  // const address = addresses.find((address) => address.id == parseInt(params.id))

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link href="/account/addresses">
          <MoveLeft
            size={30}
            strokeWidth={3}
            className="cursor-pointer hover:text-gray-500"
          />
        </Link>
        <p className=" text-3xl font-bold">Address Detail</p>
      </div>
      <AddressDetailForm address={address!.data} />
    </div>
  )
}
