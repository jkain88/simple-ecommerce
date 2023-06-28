import ProductCard from '@/components/ProductCard'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products?limit=5')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

const getUserTestimonials = async () => {
    const response = await fetch('https://dummyjson.com/users?limit=3')

    if (!response.ok) {
        throw new Error('Failed to fetch user testimonials')
    }

    return response.json()
}

export interface Product {
    id: number
    price: number
    category: string
    image: string
    title: string
}

interface User {
    id: number
    image: string
    firstName: string
    lastName: string
}

export default async function Home() {
    const products = await getProducts()
    const { users: userTestimonials } = await getUserTestimonials()
    const product = products[0]

    return (
        <main className="">
            <section className="mt-8 px-10 md:mt-14 xl:px-72">
                <div className="flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:gap-0">
                    <p className="font-serif text-3xl md:text-4xl">
                        New Plants
                    </p>
                    <div>
                        <button className="bg-primary px-6 py-3 text-sm font-bold text-white">
                            Shop Now
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                    {products.map((product: Product) => (
                        <Link href={`/products/${product.id}`}>
                            <ProductCard
                                id={product.id}
                                key={product.id}
                                price={product.price}
                                category={product.category}
                                image={product.image}
                                title={product.title}
                            />
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mt-20 bg-gray-100 py-10 text-center">
                <p className="font-serif text-3xl leading-5 underline decoration-primary decoration-1 underline-offset-4">
                    What Our Customers Say
                </p>
                <div className="mt-4 divide-x-4 divide-black" />

                <div className="md:px-50 mt-10 grid grid-cols-1 justify-center gap-12 px-10 font-semibold md:grid-cols-3 md:gap-28 2xl:px-[25%]">
                    {userTestimonials.map((user: User) => (
                        <div
                            className="flex flex-col items-center gap-2 rounded-lg bg-white p-6 shadow-lg md:gap-4"
                            key={user.id}
                        >
                            <FontAwesomeIcon
                                icon={faQuoteLeft}
                                className="mx-auto w-7 text-primary"
                            />
                            <p>
                                Sed odio donec curabitur auctor amet tincidunt
                                non odio enim felis tincidunt amet morbi egestas
                                hendrerit.
                            </p>
                            <Avatar>
                                <AvatarImage
                                    className="w-80"
                                    src={user.image}
                                />
                            </Avatar>
                            <p className="text-sm">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
