'use client'

import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Trash2 } from 'lucide-react'

const CheckoutLine: React.FC = () => {
  return (
    <div className="w-full max-w-4xl grow">
      <div className="flex justify-between bg-white px-4 py-2">
        <div className=" flex items-center justify-center gap-2">
          <Checkbox id="select-all" />

          <label htmlFor="select-all" className="text-sm">
            {' '}
            Select All
          </label>
        </div>
        <div className="flex items-center gap-1">
          <Trash2 />
          <p className="text-sm">Delete</p>
        </div>
      </div>
      <div className="mt-5 bg-white">
        <p>Cart</p>
      </div>
      <div className="mt-5 bg-white">
        <p>Cart</p>
      </div>
      <div className="mt-5 bg-white">
        <p>Cart</p>
      </div>
    </div>
  )
}

export default CheckoutLine
