import React from 'react'

interface Props {
    children: React.ReactNode
}

const ProductPageContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-100 px-10 py-20">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-10 bg-white py-5 lg:py-20 px-10 lg:px-20 shadow-2xl">
                {children}
            </div>
        </div>
    )
}

export default ProductPageContainer
