'use client'

// import { Button } from '@nextui-org/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {
  id: number
}

const AddressActions: React.FC<Props> = ({ id }) => {
  return (
    <div className="mt-2 flex flex-col gap-1">
      <Link href={`/account/addresses/${id}`} className="flex">
        <Button
          size="sm"
          className="w-full bg-gray-200 px-10 text-sm font-semibold text-black hover:bg-gray-500"
        >
          Edit
        </Button>
      </Link>
      <Button
        size="sm"
        className="w-full bg-gray-200 px-10 text-sm font-semibold text-black hover:bg-gray-500"
      >
        Delete
      </Button>
      <Button
        size="sm"
        className="bg-gray-200 px-10 text-sm font-semibold text-black hover:bg-gray-500"
      >
        Set as Default
      </Button>
    </div>
  )
}

export default AddressActions
