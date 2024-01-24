'use client'

import { Api, CheckoutLine, Product } from '@/lib/Api'
import { useCheckoutStore } from '@/store/checkout'
import { useUserStore } from '@/store/user'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  product: Product
}

const ProductDetail: React.FC<Props> = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const user = useUserStore((state) => state.user)
  const checkout = useCheckoutStore((state) => state.checkout)
  const setUser = useUserStore((state) => state.setUser)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)
  const { mutate: createCheckoutLine } = useMutation({
    mutationKey: ['createCheckoutLine'],
    mutationFn: async (data: CheckoutLine) => {
      const api = new Api()
      return api.checkout.checkoutLineCreateCreate(data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${session?.token}`,
        },
      })
    },
    onSuccess: (data) => {
      setCheckout({
        ...checkout,
        lines: [
          ...(checkout?.lines || []),
          { ...data.data, isSelected: false },
        ],
      })
      toast.success('Added to cart')
    },
  })
  const { mutate: initializeCheckout } = useMutation({
    mutationKey: ['createCheckout'],
    mutationFn: async () => {
      const api = new Api()
      return api.checkout.checkoutCreateCreate(
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${session?.token}`,
          },
        }
      )
    },
    onSuccess: (data) => {
      createCheckoutLine({
        checkout: data.data.id!,
        quantity,
        product_variant: selectedVariant.id,
      })
      toast.success('Added to cart')
    },
  })
  const { data: session } = useSession()

  const onAddToCart = () => {
    if (user && !checkout) {
      initializeCheckout()
    } else {
      console.log('CHECKOUT', checkout)
      createCheckoutLine({
        checkout: checkout!.id!,
        quantity,
        product_variant: selectedVariant.id,
      })
    }
  }
  return (
    <div className="grid auto-rows-auto lg:grid-cols-2">
      <div className="flex h-full w-full justify-center">
        <Image
          src={
            product.images[0].image !== undefined
              ? product.images[0].image
              : '/placeholder.jpg'
          }
          alt="Product Image"
          width={300}
          height={300}
        />
      </div>
      <div className="mt-8 flex flex-col gap-5 lg:justify-center">
        <div>
          <p className="font-serif text-3xl">{product.name}</p>
          <p>{product.category?.name}</p>
        </div>
        <p className="text-2xl font-bold text-neutral-600">${product.price}</p>
        <p className="tracking-wide">{product.description}</p>
        <div className="mt-4 flex gap-4">
          <input
            type="number"
            className="w-12 border-[1px] border-solid border-neutral-200 py-1 pl-3"
            min="1"
            value={quantity}
            onInput={(e) => {
              const newValue = parseInt(e.currentTarget.value)
              if (newValue > quantity) {
                setQuantity((prev) => prev + 1)
              } else if (newValue < quantity) {
                setQuantity((prev) => prev - 1)
              }
            }}
          />
          <Button
            className="bg-black px-10 text-white disabled:bg-gray-300"
            onClick={onAddToCart}
            disabled={!session}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
