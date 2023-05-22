import Image from 'next/image'

export default function Home() {
    return (
        <main>
            <div className='md:min-h-screenz-0 mb-8 flex min-h-screen w-full flex-col items-center justify-center bg-[url("../public/hero.jpg")] bg-cover bg-center bg-no-repeat text-white'>
                <p className="font-serif text-3xl tracking-wider">
                    WELCOME TO THE GREENSTORE
                </p>
                <h1 className="mt-20 font-serif text-8xl">
                    Let’s Bring the Spring to
                    <span className="block text-center">Your Home</span>
                </h1>
                <button className="p mt-10 border-solid bg-white px-14 py-5 text-xl font-semibold text-black">
                    Shop Now
                </button>
            </div>
            <div className="mx-10 mt-20 flex flex-col justify-center gap-10 md:mx-52">
                <div className="flex w-full flex-col justify-between md:flex-row ">
                    <p className="text-2xl">New Plants</p>
                    <button>Shop Now</button>
                </div>
                <section>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Assumenda, eum minus omnis nisi illum ea accusantium,
                    incidunt quibusdam commodi fuga eveniet exercitationem vitae
                    voluptatum laborum voluptates voluptatibus. Animi, deserunt
                    magnam.
                </section>
            </div>
        </main>
    )
}
