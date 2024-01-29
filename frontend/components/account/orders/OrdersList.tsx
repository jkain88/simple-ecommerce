'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Api } from '@/lib/Api'
import { extractPageFromUrl } from '@/lib/utils'
import { Button, Image, Skeleton, Spinner } from '@nextui-org/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

type OrderStatus = 'pending' | 'processing' | 'in transit' | 'delivered'

const getOrders =
  (status: OrderStatus, session: Session | null) =>
  async ({ pageParam = 1 }: { pageParam: number }) => {
    const api = new Api()
    const response = await api.orders.ordersList(
      {
        page_size: 5,
        page: pageParam,
        status: status,
      },
      {
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      }
    )
    return response.data
  }

const OrdersList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<OrderStatus>('pending')
  const { data: session } = useSession()
  const {
    data: orders,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [`orders-${selectedTab}`],
    queryFn: getOrders(selectedTab, session),
    getNextPageParam: (lastPage) => {
      const nextPage = extractPageFromUrl(lastPage.next)
      return nextPage
    },
    initialPageParam: 1,
  })

  return (
    <div>
      <div className="mt-3 flex justify-center">
        <Tabs defaultValue="pending" className="flex-1 ">
          <TabsList className="flex w-full gap-16 rounded-lg bg-white py-7 text-lg">
            <TabsTrigger
              className="rounded-xl text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
              value="pending"
              onClick={() => setSelectedTab('pending')}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              className="rounded-xl text-lg font-semibold text-black data-[state=active]:bg-zinc-400"
              value="processing"
              onClick={() => setSelectedTab('processing')}
            >
              Processing
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
      {isLoading && (
        <div className="mt-3">
          <div className="divide-y-1 bg-white p-5">
            <div className="flex justify-between">
              <Skeleton
                disableAnimation={true}
                className="h-5 w-60 rounded-lg bg-zinc-400"
              />
              <Skeleton
                disableAnimation={true}
                className="h-5 w-40 rounded-lg bg-zinc-400"
              />
            </div>
            <div className="mt-5 pt-5">
              <div className="flex  justify-between">
                <div className=" flex gap-4">
                  <Skeleton
                    disableAnimation={true}
                    className="h-24 w-20 rounded-lg bg-zinc-400"
                  />
                  <div className="flex flex-col gap-2">
                    <Skeleton
                      disableAnimation={true}
                      className="h-5 w-60 rounded-lg bg-zinc-400"
                    />
                    <Skeleton
                      disableAnimation={true}
                      className="h-5 w-20 rounded-lg bg-zinc-400"
                    />
                  </div>
                </div>
                <Skeleton
                  disableAnimation={true}
                  className="h-5 w-20 rounded-lg bg-zinc-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading &&
        orders?.pages.map((page) =>
          page.results.map((order) => (
            <div key={order.id} className="mt-4 divide-y-1 bg-white p-4">
              <div className="flex justify-between pb-3">
                <div className="text-xl font-semibold">
                  Reference: {order.reference}
                </div>
                <div className="rounded-lg bg-black px-3 py-1 capitalize text-white">
                  {order.status}
                </div>
              </div>
              <div className=" pt-2">
                <div className="divide-y-1">
                  {order?.lines?.map((line) => (
                    <Link key={line.id} href={`/orders/${order.id}`}>
                      <div className="flex gap-5 px-6 py-4">
                        <Image
                          alt="product"
                          isZoomed
                          className="h-20 justify-center rounded-xl object-cover"
                          src={
                            line!.product_variant_detail!.product!.thumbnail!
                          }
                        />
                        <div className="flex w-full justify-between">
                          <div>
                            <p className="text-xl">
                              {line?.product_variant_detail?.name}
                            </p>
                            <p>Qty: {line.quantity}</p>
                          </div>
                          <div>
                            <p>₱{line?.product_variant_detail?.price}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      {hasNextPage && (
        <Button
          className="mx-auto mt-5 block w-56 bg-black px-8 text-white"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          <div className="flex items-center justify-center gap-2">
            {isFetching && <Spinner size="sm" color="white" />}
            <p>View More</p>
          </div>
        </Button>
      )}
    </div>
  )
}

export default OrdersList
