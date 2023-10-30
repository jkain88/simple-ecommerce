import classNames from 'classnames'
import React from 'react'

const Paginator: React.FC = () => {
  const pageData = [
    {
      page: 1,
      isActive: true,
    },
    {
      page: 2,
      isActive: false,
    },
    {
      page: 3,
      isActive: false,
    },
    {
      page: 4,
      isActive: false,
    },
    {
      page: 5,
      isActive: false,
    },
  ]
  return (
    <div className="mt-10 flex gap-2">
      {pageData.map((data) => (
        <div
          key={data.page}
          className={classNames(
            'cursor-pointer border-2 border-solid border-black px-4 py-2 text-sm duration-500 transition hover:bg-black hover:text-white',
            {
              'bg-black': data.isActive,
              'text-white': data.isActive,
            }
          )}
        >
          {data.page}
        </div>
      ))}
    </div>
  )
}

export default Paginator
