'use client'

import AddressDetailForm from '@/components/forms/AddressDetailForm'
import { useAddressStore } from '@/store/address'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddressDetail({ params }: { params: { id: string } }) {
  const address = useAddressStore((state) =>
    state.addresses.find((address) => address.id == parseInt(params.id))
  )

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
      <AddressDetailForm address={address} />
    </div>
  )
}
