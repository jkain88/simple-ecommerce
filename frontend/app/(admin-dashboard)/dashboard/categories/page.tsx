'use client'

import Table from '@/components/Table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Api, Category } from '@/lib/Api'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { debounce } from 'lodash'
import { Trash2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return <div className="">Name</div>
    },
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: 'noOfProducts',
    header: () => <div className="text-right">No. of products</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.no_of_products}
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
          <Trash2 className="text-black" />
        </div>
      ),
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              View Product
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Categories() {
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [searchString, setSearchString] = useState('')
  const searchParams = useSearchParams()
  const createQueryString = useCreateQueryString()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDebouncedSearch = useCallback(
    debounce((value) => setDebouncedSearch(value), 300),
    []
  )
  useEffect(() => {
    updateDebouncedSearch(searchString)
    if (searchString !== '') {
      createQueryString('page', '1')
    }
  }, [searchString, updateDebouncedSearch, createQueryString])

  const page = searchParams.get('page') ?? '1'

  const { data: categories, isLoading } = useQuery({
    queryKey: ['dashboard-categories', debouncedSearch, page],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsCategoriesList({
        page_size: 10,
        page: parseInt(page),
        search: searchString,
      })
    },
  })

  const handleSearchCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
  }

  return (
    <div className="h-screen">
      <div className="mt-20">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search category"
            value={searchString}
            onChange={(event) => handleSearchCategory(event)}
            className="max-w-sm"
          />
          <Button>Create Category</Button>
        </div>
        <Table
          columns={columns}
          data={categories?.data}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
