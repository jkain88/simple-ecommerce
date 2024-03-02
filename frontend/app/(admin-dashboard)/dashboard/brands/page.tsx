'use client'

import Table from '@/components/Table'
import BrandActionForm from '@/components/forms/BrandActionForm'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Api, Brand } from '@/lib/Api'
import { useBrandStore } from '@/store/brand'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { debounce } from 'lodash'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const getColumns = (
  onOpen: () => void,
  handleOpenBrandActionModal: (
    selctedBrand: Brand | undefined,
    action: 'create' | 'update'
  ) => void
): ColumnDef<Brand>[] => [
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
    cell: ({ row }) => (
      <div
        className="cursor-pointer capitalize"
        onClick={() => handleOpenBrandActionModal(row.original, 'update')}
      >
        {row.original.name}
      </div>
    ),
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
          <Trash2 className="cursor-pointer text-black" onClick={onOpen} />
        </div>
      ),
  },
]

export default function Brands() {
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [searchString, setSearchString] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [action, setAction] = useState<'create' | 'update'>('create')
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand)
  const createQueryString = useCreateQueryString()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isActionModalOpen,
    onOpen: onActionModalOpen,
    onOpenChange: onOpenActionModalChange,
  } = useDisclosure()
  const queryClient = useQueryClient()
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

  const { data: brands, isLoading } = useQuery({
    queryKey: ['dashboard-brands', debouncedSearch, page],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsBrandsList({
        page_size: 10,
        page: parseInt(page),
        search: searchString,
      })
    },
  })

  const { mutate: deleteBrands } = useMutation({
    mutationKey: ['deleteBrands'],
    mutationFn: async (brandIds: number[]) => {
      const api = new Api()
      return api.products.productsBrandsDeleteDelete(
        { brand_ids: brandIds },
        {
          headers: {
            Authorization: `Token ${session?.token}`,
          },
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-brands', debouncedSearch, page],
      })
      setRowSelection({})
    },
  })

  const handleOpenBrandActionModal = (
    selectedBrand: Brand | undefined,
    action: 'create' | 'update'
  ) => {
    setSelectedBrand(selectedBrand)
    setAction((prev) => action)
    onActionModalOpen()
  }

  const columns = getColumns(onOpen, handleOpenBrandActionModal)
  const table = useReactTable({
    data: brands?.data.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const handleSearchBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
  }

  const handleDeleteBrands = (onClose: () => void) => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => Object.keys(rowSelection).includes(row.id))
      .map((row) => row.original)
    const brandIds = selectedRows.map((brand) => brand.id) as number[]
    deleteBrands(brandIds)
    onClose()
  }

  return (
    <div className="h-full">
      <div className="mt-20">
        <h1 className="text-3xl font-semibold">Brand</h1>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search brand"
            value={searchString}
            onChange={(event) => handleSearchBrand(event)}
            className="max-w-sm"
          />
          <Button
            onClick={() => handleOpenBrandActionModal(undefined, 'create')}
          >
            Create Brand
          </Button>
        </div>
        <Table
          table={table}
          columns={columns}
          data={brands?.data}
          isLoading={isLoading}
        />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Brand
              </ModalHeader>
              <ModalBody>
                <p>Are you want to delete the selected brands(s)?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => handleDeleteBrands(onClose)}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isActionModalOpen} onOpenChange={onOpenActionModalChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === 'create' ? 'Create' : 'Update'} Brand
              </ModalHeader>
              <ModalBody>
                <BrandActionForm
                  onClose={onClose}
                  page={page}
                  search={debouncedSearch}
                  action={action}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
