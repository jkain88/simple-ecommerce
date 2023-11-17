'use client'

import { Button } from '@nextui-org/react'
import React from 'react'

const AddressActions: React.FC = () => {
  return (
    <div className="mt-2 flex flex-col gap-1">
      <Button size="sm" className="font-semibold">
        Edit
      </Button>
      <Button size="sm" className="font-semibold">
        Delete
      </Button>
      <Button size="sm" className="font-semibold">
        Set as Default
      </Button>
    </div>
  )
}

export default AddressActions
