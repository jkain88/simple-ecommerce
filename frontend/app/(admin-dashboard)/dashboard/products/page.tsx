'use client'

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Api, Product } from '@/lib/Api'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Table from '@/components/Table'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'

const getColumns = (onOpen: () => void): ColumnDef<Product>[] => [
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
    cell: ({ row, table }) => (
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
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4 capitalize">
          <Image
            src={row.original.images[0].image!}
            width={30}
            height={10}
            alt="product image"
          />
          <p>{row.getValue('name')}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return <div className="">Category</div>
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.category?.name}</div>
    ),
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => {
      return <div className="">Brand</div>
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.brand?.name}</div>
    ),
  },
  {
    accessorKey: 'published',
    header: ({ column }) => {
      return <div className="">Published</div>
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.is_published!.toString()}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.original.price)

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: ({ table }) =>
      (table.getIsSomePageRowsSelected() ||
        table.getIsAllPageRowsSelected()) && (
        <div className="pl-2">
          <Trash2 className="cursor-pointer text-black" onClick={onOpen} />
        </div>
      ),
  },
]

export default function DashboardProducts() {
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [searchString, setSearchString] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const searchParams = useSearchParams()
  const createQueryString = useCreateQueryString()
  const { data: session } = useSession()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const queryClient = useQueryClient()
  const { mutate: deleteProducts } = useMutation({
    mutationKey: ['dashboard-delete-products'],
    mutationFn: async (productIds: number[]) => {
      const api = new Api()
      return api.products.productsDeleteDelete(
        { product_ids: productIds },
        {
          headers: {
            Authorization: `Token ${session?.token}`,
          },
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-products', debouncedSearch, page],
      })
      setRowSelection({})
    },
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDebouncedSearch = useCallback(
    debounce((value) => setDebouncedSearch(value), 300),
    []
  )
  useEffect(() => {
    updateDebouncedSearch(searchString)
    if (searchString !== '' && searchParams.get('page') !== '1') {
      createQueryString('page', '1')
    }
  }, [searchString, updateDebouncedSearch, createQueryString, searchParams])

  const page = searchParams.get('page') ?? '1'

  const { data: products, isLoading } = useQuery({
    queryKey: ['dashboard-products', debouncedSearch, page],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsList({
        page_size: 10,
        search: debouncedSearch,
        page: parseInt(page),
      })
    },
  })
  const columns = getColumns(onOpen)
  const table = useReactTable({
    data: products?.data.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const handleSearchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
  }

  const handleDeleteProducts = (onClose: () => void) => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => Object.keys(rowSelection).includes(row.id))
      .map((row) => row.original)
    const productIds = selectedRows.map((product) => product.id) as number[]
    deleteProducts(productIds)
    onClose()
  }

  return (
    <div className="h-full">
      <div className="mt-20">
        <h1 className="text-3xl font-semibold">Products</h1>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search product"
            value={searchString}
            onChange={(event) => handleSearchProduct(event)}
            className="max-w-sm"
          />
          <Button>Create Product</Button>
        </div>
        <Table
          columns={columns}
          data={products?.data}
          isLoading={isLoading}
          table={table}
        />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Product
              </ModalHeader>
              <ModalBody>
                <p>Are you want to delete the selected product(s)?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => handleDeleteProducts(onClose)}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
