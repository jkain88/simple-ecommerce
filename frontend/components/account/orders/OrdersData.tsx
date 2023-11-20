'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { orders } from '@/constants/testData'
import React, { useState } from 'react'

const OrdersData: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    'pending' | 'in transit' | 'delivered'
  >('pending')

  const filteredOrdersByStatus = orders.filter(
    (order) => order.status === selectedTab
  )
  console.log(filteredOrdersByStatus)
  return (
    <div>
      <div className="mt-3 flex justify-center">
        <Tabs defaultValue="pending" className="flex-1">
          <TabsList className="flex w-full gap-16 py-7 text-lg">
            <TabsTrigger
              className="rounded-xl text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
              value="pending"
              onClick={() => setSelectedTab('pending')}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              className="rounded-xl text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
              value="in transit"
              onClick={() => setSelectedTab('in transit')}
            >
              In Transit
            </TabsTrigger>
            <TabsTrigger
              className="rounded-lg text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
              value="delivered"
              onClick={() => setSelectedTab('delivered')}
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="mt-3">
        {filteredOrdersByStatus.map((order) => (
          <div key={order.id}>
            <div className="flex justify-between">
              <div>{order.reference}</div>
              <div>{order.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersData
