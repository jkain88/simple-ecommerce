import AddressDetailForm from '@/components/forms/AddressDetailForm'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddressCreate() {
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
        <p className=" text-3xl font-bold">Create Address</p>
      </div>
      <AddressDetailForm type="create" />
    </div>
  )
}
