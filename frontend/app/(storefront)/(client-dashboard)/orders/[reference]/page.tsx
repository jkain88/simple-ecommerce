'use client'

import OrderDetails from '@/components/account/orders/OrderDetails'
import { Api } from '@/lib/Api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export default function Order({ params }: { params: { reference: string } }) {
  const { data: session } = useSession()
  const { data: order } = useQuery({
    queryKey: ['order', params.reference],
    queryFn: async () => {
      const api = new Api()
      return api.orders.ordersRead(params.reference, {
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
    },
  })
  // const order = orders.find((order) => order.id == parseInt(params.id))
  // console.log(order)
  if (order === undefined) return <div>Order not found</div>
  console.log('ORDER', order)
  return (
    <div className="w-full">
      <h1 className="pb-3 text-3xl font-bold">Orders Details</h1>
      <OrderDetails order={order.data} />
    </div>
  )
}
