import OrdersList from '@/components/account/orders/OrdersList'

export default function Orders() {
  return (
    <div className="w-full">
      <h1 className="pb-3 text-3xl font-bold">Orders</h1>
      <OrdersList />
    </div>
  )
}
