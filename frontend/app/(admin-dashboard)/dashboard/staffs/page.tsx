'use client'

import Table from '@/components/Table'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Api, User } from '@/lib/Api'
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

export const getColumns = (): ColumnDef<User>[] => [
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
    accessorKey: 'email',
    header: ({ column }) => {
      return <div className="">Email</div>
    },
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.email}</div>
    ),
  },
  {
    accessorKey: 'dateCreated',
    header: () => <div className="text-right">Date created</div>,
    cell: ({ row }) => {
      const date = parseISO(row.original.created!)
      const formattedDate = format(date, 'yyyy-MM-dd')

      return <div className="text-right font-medium">{formattedDate}</div>
    },
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-right">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.first_name} {row.original.last_name}
        </div>
      )
    },
  },
  {
    accessorKey: 'contactNumber',
    header: () => <div className="text-right">Contact Number</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.contact_number}
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

export default function Staffs() {
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
  const { data: staffs, isLoading } = useQuery({
    queryKey: ['dashboard-staffs', debouncedSearch, page],
    queryFn: async () => {
      const api = new Api()
      return api.users.usersList(
        {
          page_size: 10,
          page: parseInt(page),
          is_staff: 'true',
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
      createQueryString('page', '1')
    }
  }, [searchString, updateDebouncedSearch, createQueryString, isLoading])

  const columns = getColumns()
  const data = useMemo(() => staffs?.data.results ?? [], [staffs?.data.results])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const handleSearchCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
  }

  return (
    <div className="h-screen">
      <div className="mt-20">
        <h1 className="text-3xl font-semibold">Customers</h1>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search customer"
            value={searchString}
            onChange={(event) => handleSearchCustomer(event)}
            className="max-w-sm"
          />
        </div>
        <Table
          table={table}
          columns={columns}
          data={staffs?.data}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
