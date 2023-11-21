import OrderDetails from '@/components/account/orders/OrderDetails'
import { orders } from '@/constants/testData'

export default function Order({ params }: { params: { id: string } }) {
  const order = orders.find((order) => order.id == parseInt(params.id))
  console.log(order)
  if (order === undefined) return <div>Order not found</div>
  return (
    <div className="w-full">
      <h1 className="pb-3 text-3xl font-bold">Orders Details</h1>
      <OrderDetails order={order} />
    </div>
  )
}
