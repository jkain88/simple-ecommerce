'use client'

import AddressActions from '@/components/account/address/AddressActions'
import { Button } from '@/components/ui/button'
import { Api } from '@/lib/Api'
import { useAddressStore } from '@/store/address'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Addresses() {
  const { data: session } = useSession()
  const setAddresses = useAddressStore((state) => state.setAddresses)
  const addressStore = useAddressStore((state) => state.addresses)
  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const api = new Api()
      return api.users.usersAddressesList({
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
    },
  })

  useEffect(() => {
    if (!isLoading) {
      setAddresses(addresses!.data)
    }
  }, [isLoading, addresses, setAddresses])

  if (isLoading || addresses === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="divide-y-1">
      <p className="pb-3 text-3xl font-bold">My Addresses</p>
      <div className="pt-5">
        <p className="text-2xl font-semibold">Address</p>
        <div className="flex flex-col gap-7 divide-y-2">
          {addressStore!.map((address) => (
            <div className="flex justify-between" key={address.id}>
              <div key={address.id} className="flex flex-col gap-2 pt-7">
                <p className="text-xl font-semibold">
                  {address.street}, {address.city_area}, {address.city},{' '}
                  {address.province}
                </p>
                {address.is_default && (
                  <div className="flex-shrink-0">
                    <div className="inline-block border-2 border-black p-1 ">
                      <p className="text-xs font-semibold uppercase">Default</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-2 divide-x-2 divide-black">
                  <p className="pl-2 text-sm text-gray-400">
                    {address.contact_number}
                  </p>
                </div>
              </div>
              <AddressActions address={address} />
            </div>
          ))}
          <div className="flex w-full justify-end">
            <a href="/account/addresses/create">
              <Button className="mt-6 bg-black px-10 text-sm font-semibold text-white hover:bg-gray-500">
                Add Address
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
