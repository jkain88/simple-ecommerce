import ProductCard from '@/components/ProductCard'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

export default async function Home() {
    const products = await getProducts()
    const { users: userTestimonials } = await getUserTestimonials()
    const product = products[0]

    return (
        <main className="">
            <section className="mt-8 px-6 md:mt-14 md:px-80">
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
                    {products.map((product) => (
                        <ProductCard
                            id={product.id}
                            price={product.price}
                            category={product.category}
                            image={product.image}
                            title={product.title}
                        />
                    ))}
                    <ProductCard
                        id={product.id}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                        title={product.title}
                    />
                </div>
            </section>

            <article className="mt-14 flex flex-col items-center gap-6 md:flex-row md:gap-24">
                <img
                    src="/our_story.jpg"
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="plants"
                    className="h-[500px] w-[950px]"
                />

                <div className="flex flex-col gap-5 px-6 md:w-1/4 md:px-0">
                    <p className="font-serif text-lg uppercase tracking-widest md:text-2xl">
                        Our story
                    </p>
                    <p className="font-serif text-3xl md:text-4xl">
                        For People Who Love Plants
                    </p>
                    <div className="flex flex-col gap-4 text-sm">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aliquid facilis, natus in quam tempora maxime
                            at, dolore ut possimus nihil velit corporis
                            reprehenderit quo veniam fugit atque! Praesentium,
                            expedita optio?
                        </p>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Harum animi dolorum quas dolores alias,
                            voluptatem nostrum itaque repellendus hic ad
                            cupiditate ipsam veritatis consequuntur reiciendis
                            ea velit voluptatum earum labore?
                        </p>
                    </div>

                    <div>
                        <button className="bg-primary px-6 py-3 text-sm font-bold text-white">
                            Read More
                        </button>
                    </div>
                </div>
            </article>

            <section className="mt-20 text-center">
                <p className="font-serif text-3xl leading-5 underline decoration-primary decoration-1 underline-offset-4">
                    {' '}
                    What Our Customers Say
                </p>
                <div className="mt-4 divide-x-4 divide-black" />

                <div className="mt-10 grid grid-cols-1 justify-center gap-12 px-10 font-semibold md:grid-cols-3 md:gap-28 md:px-80">
                    {userTestimonials.map((user) => (
                        <div className="flex flex-col items-center gap-2 md:gap-4">
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

            <footer className="mt-20 h-96 w-full bg-lime-800">
                <p className="text-9xl">FOOTER</p>
            </footer>
        </main>
    )
}
