import { Pagination as NextUIPagination } from '@nextui-org/react'
import React, { use, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { useSearchParams } from 'next/navigation'

type Props = {
  totalPages: number | undefined
  next: string | undefined
}

const Pagination: React.FC<Props> = ({ totalPages, next }) => {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const createQueryString = useCreateQueryString()

  const page = searchParams.get('page')
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev < 100 ? prev + 1 : prev))
  }

  useEffect(() => {
    createQueryString('page', currentPage.toString())
  }, [currentPage, createQueryString])

  useEffect(() => {
    if (page === '1') {
      setCurrentPage(1)
    }
  }, [page])

  return (
    <div className="grid flex-1 place-items-center gap-2">
      <div className="flex gap-4">
        <Button variant="outline" size="sm" onClick={handlePrevious}>
          Previous
        </Button>
        <NextUIPagination
          total={totalPages !== undefined ? totalPages : 1}
          color="default"
          page={currentPage}
          onChange={setCurrentPage}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={next === null}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
