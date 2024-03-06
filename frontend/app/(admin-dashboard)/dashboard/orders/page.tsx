'use client'

import Table from '@/components/Table'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Api, Order } from '@/lib/Api'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { debounce } from 'lodash'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const getColumns = (): ColumnDef<Order>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'reference',
    header: ({ column }) => {
      return <div className="">Reference</div>
    },
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.reference}</div>
    ),
  },
  {
    accessorKey: 'datePlaced',
    header: () => <div className="text-right">Date placed</div>,
    cell: ({ row }) => {
      const date = parseISO(row.original.created!)
      const formattedDate = format(date, 'yyyy-MM-dd hh:mm a')

      return <div className="text-right font-medium">{formattedDate}</div>
    },
  },
  {
    accessorKey: 'customer',
    header: () => <div className="text-right">Customer</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.original.user_email}</div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original.status}</div>
    },
  },
  {
    accessorKey: 'totalAmount',
    header: () => <div className="text-right">Total Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          PHP{row.original.total_amount}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: ({ table }) =>
      (table.getIsSomePageRowsSelected() ||
        table.getIsAllPageRowsSelected()) && (
        <div className="pl-2">
          <Trash2 className="cursor-pointer text-black" />
        </div>
      ),
  },
]

export default function Orders() {
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [searchString, setSearchString] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const createQueryString = useCreateQueryString()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDebouncedSearch = useCallback(
    debounce((value) => setDebouncedSearch(value), 300),
    []
  )

  const page = searchParams.get('page') ?? '1'
  const { data: orders, isLoading } = useQuery({
    queryKey: ['dashboard-orders', debouncedSearch, page],
    queryFn: async () => {
      const api = new Api()
      return api.orders.ordersList(
        {
          page_size: 10,
          page: parseInt(page),
          search: searchString,
        },
        {
          headers: {
            Authorization: `Token ${session?.user.token}`,
          },
        }
      )
    },
  })

  useEffect(() => {
    updateDebouncedSearch(searchString)
    if (searchString !== '' && !isLoading) {
      console.log('in here')
      createQueryString('page', '1')
    }
    console.log('effect')
  }, [searchString, updateDebouncedSearch, createQueryString, isLoading])

  const columns = getColumns()
  const data = useMemo(() => orders?.data.results ?? [], [orders?.data.results])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const handleSearchOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
  }

  console.log('RENDERED')
  return (
    <div className="h-screen">
      <div className="mt-20">
        <h1 className="text-3xl font-semibold">Orders</h1>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search category"
            value={searchString}
            onChange={(event) => handleSearchOrder(event)}
            className="max-w-sm"
          />
        </div>
        <Table
          table={table}
          columns={columns}
          data={orders?.data}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
