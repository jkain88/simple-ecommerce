'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
}

const ProductPageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-100 px-10 py-20">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-10 bg-white px-10 py-5 shadow-2xl lg:px-20 lg:py-20">
        {children}
      </div>
    </div>
  )
}

export default ProductPageContainer
