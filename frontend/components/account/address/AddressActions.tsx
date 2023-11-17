'use client'

import { Button } from '@nextui-org/react'
import React from 'react'

const AddressActions: React.FC = () => {
  return (
    <div className="mt-2 flex flex-col gap-1">
      <Button size="sm">Edit</Button>
      <Button size="sm">Delete</Button>
      <Button size="sm">Set as Default</Button>
    </div>
  )
}

export default AddressActions
