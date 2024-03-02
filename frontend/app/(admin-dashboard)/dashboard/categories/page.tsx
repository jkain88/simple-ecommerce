'use client'

import Table from '@/components/Table'
import CategoryActionForm from '@/components/forms/CategoryActionForm'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Api, Category } from '@/lib/Api'
import { useCategoryStore } from '@/store/category'
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
  handleOpenCategoryActionModal: (
    selectedCategory: Category | undefined,
    action: 'create' | 'update'
  ) => void
): ColumnDef<Category>[] => [
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
        onClick={() => handleOpenCategoryActionModal(row.original, 'update')}
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

export default function Categories() {
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [searchString, setSearchString] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [action, setAction] = useState<'create' | 'update'>('create')
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  )
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

  const { mutate: deleteCategories } = useMutation({
    mutationKey: ['deleteCategories'],
    mutationFn: async (categoryIds: number[]) => {
      const api = new Api()
      return api.products.productsCategoriesDeleteDelete(
        { category_ids: categoryIds },
        {
          headers: {
            Authorization: `Token ${session?.token}`,
          },
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-categories', debouncedSearch, page],
      })
      setRowSelection({})
    },
  })
  const handleOpenCategoryActionModal = (
    selectedCategory: Category | undefined,
    action: 'create' | 'update'
  ) => {
    setSelectedCategory(selectedCategory)
    setAction(action)
    onActionModalOpen()
  }

  const columns = getColumns(onOpen, handleOpenCategoryActionModal)
  const table = useReactTable({
    data: categories?.data.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const handleSearchCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
  }

  const handleDeleteCategories = (onClose: () => void) => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => Object.keys(rowSelection).includes(row.id))
      .map((row) => row.original)
    const categoryIds = selectedRows.map((product) => product.id) as number[]
    deleteCategories(categoryIds)
    onClose()
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
          <Button
            onClick={() => handleOpenCategoryActionModal(undefined, 'create')}
          >
            Create Category
          </Button>
        </div>
        <Table
          table={table}
          columns={columns}
          data={categories?.data}
          isLoading={isLoading}
        />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Category
              </ModalHeader>
              <ModalBody>
                <p>Are you want to delete the selected category(s)?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => handleDeleteCategories(onClose)}
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
                Create Category
              </ModalHeader>
              <ModalBody>
                <CategoryActionForm
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
