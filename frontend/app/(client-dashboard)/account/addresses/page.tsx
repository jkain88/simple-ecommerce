import AddressActions from '@/components/account/address/AddressActions'
import { addresses } from '@/constants/testData'
import { Button } from '@nextui-org/react'

export default function Addresses() {
  return (
    <div className="divide-y-1">
      <p className="pb-3 text-3xl font-bold">My Addresses</p>
      <div className="pt-5">
        <p className="text-2xl font-semibold">Address</p>
        <div className="flex flex-col gap-7 divide-y-2">
          {addresses.map((address) => (
            <div className="flex justify-between">
              <div key={address.id} className="flex flex-col gap-2 pt-7">
                <div className="flex gap-2 divide-x-2 divide-black">
                  <p className="text-lg font-bold">{address.name}</p>
                  <p className="pl-2 text-gray-400">{address.contactNumber}</p>
                </div>
                <p>{address.address}</p>
                {address.isDefault && (
                  <div className="flex-shrink-0">
                    <div className="inline-block border-2 border-black p-1 ">
                      <p className="text-xs font-semibold uppercase">Default</p>
                    </div>
                  </div>
                )}
              </div>
              <AddressActions />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
