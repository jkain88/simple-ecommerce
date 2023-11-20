import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const OrdersData: React.FC = () => {
  return (
    <div className="mt-3 flex justify-center">
      <Tabs className="flex-1">
        <TabsList className="flex w-full gap-16 py-7 text-lg">
          <TabsTrigger
            className="rounded-xl text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
            value="pending"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            className="rounded-xl text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
            value="in transit"
          >
            In Transit
          </TabsTrigger>
          <TabsTrigger
            className="rounded-lg text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
            value="delivered"
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default OrdersData
