import Image from 'next/image'

export default function Products() {
    return (
        <div className="min-h-screen w-full bg-gray-200 py-20">
            <div className="mx-40 flex flex-col gap-10 bg-white p-20">
                <p>Home / Shop</p>
                <div className="flex justify-between">
                    <p>Showing 1-9 of 25 results</p>
                    <p>Default sorting</p>
                </div>
                <div>PRODUCTS</div>
            </div>
        </div>
    )
}
