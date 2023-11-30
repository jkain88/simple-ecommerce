'use client'

import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Input } from '../ui/input'

type PaymentMethods = 'gcash' | 'card'

const CheckoutPaymentMethods: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('gcash')

  const handleValueChange = (value: string) => {
    setPaymentMethod(value as PaymentMethods)
    console.log('clicked', value)
  }
  return (
    <div className="mt-4 bg-white ">
      <div className="bg-gray-50 px-4 py-2">
        <p className="text-lg font-bold">Payment Methods</p>
      </div>
      <div className="px-4 py-6">
        <RadioGroup onValueChange={(value) => handleValueChange(value)}>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="gcash" value="gcash" className="h-5 w-5" />
            <label htmlFor="gcash" className="text-base font-semibold">
              GCash
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="card" value="card" className="h-5 w-5" />
            <label htmlFor="card" className="text-base font-semibold">
              Debit / Credit Card
            </label>
          </div>
        </RadioGroup>

        <Input />
      </div>
    </div>
  )
}

export default CheckoutPaymentMethods
