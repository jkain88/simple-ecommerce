import ProductCard from '@/components/ProductCard'
import Image from 'next/image'

const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Home() {
    const products = await getProducts()

    const product = products[0]
    console.log(product)

    return (
        <main>
            <section className="mt-14 px-6 md:px-80">
                <div className="flex justify-between py-8">
                    <p className="font-serif text-4xl">New Plants</p>
                    <button className="bg-lime-700 px-6 py-3 text-sm font-bold text-white">
                        Shop Now
                    </button>
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

            <article className="mt-14 flex items-center gap-14">
                <img
                    src="/our_story.jpg"
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="plants"
                    className="h-[500px] w-[950px]"
                />

                <div className="flex w-1/4 flex-col gap-5">
                    <p className="font-serif text-xl uppercase tracking-widest">
                        Our story
                    </p>
                    <p className="font-serif text-3xl">
                        For People Who Love Plants
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid facilis, natus in quam tempora maxime at, dolore
                        ut possimus nihil velit corporis reprehenderit quo
                        veniam fugit atque! Praesentium, expedita optio?
                    </p>

                    <div>
                        <button className="bg-lime-700 px-6 py-3 text-sm font-bold text-white">
                            Read More
                        </button>
                    </div>
                </div>
            </article>

            <section>Reviews</section>
        </main>
    )
}
