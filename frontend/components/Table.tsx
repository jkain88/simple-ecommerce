import {
  Table as TanstackTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Spinner } from '@nextui-org/react'
import { ColumnDef, Table, flexRender } from '@tanstack/react-table'
import React from 'react'
import Pagination from './Pagination'

type ResponseResult<T> = {
  results: T[]
  total_pages?: number | undefined
  next?: string | undefined
  previous?: string | undefined
  count?: number | undefined
}

type Props<T> = {
  columns: ColumnDef<T>[]
  data: ResponseResult<T> | undefined
  isLoading: boolean
  table: Table<T>
  onRowClick?: (row: T) => void
}

const Table = <T extends object>({
  columns,
  data,
  isLoading,
  table,
  onRowClick,
}: Props<T>) => {
  const handleOnRowClick = (row: T) => {
    if (!onRowClick) return
    onRowClick(row)
  }

  return (
    <div>
      <div className="rounded-md border bg-white">
        <TanstackTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner color="default" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                  onClick={() => handleOnRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TanstackTable>
      </div>
      <div className="mt-4 flex items-center justify-between space-x-2 py-4">
        <Pagination totalPages={data?.total_pages} next={data?.next} />
      </div>
    </div>
  )
}

export default Table
