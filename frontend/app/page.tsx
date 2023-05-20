import Image from 'next/image'

export default function Home() {
    return (
        <main>
            <div className='md:h-min-screen mb-8 flex min-h-screen w-full flex-col items-center justify-center bg-[url("../public/hero.jpg")] bg-cover bg-center bg-no-repeat'>
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
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia repellendus laudantium molestiae labore eius porro quae
                reiciendis perferendis, vero ducimus dicta sunt cumque similique
                necessitatibus mollitia animi minus suscipit obcaecati.
            </div>
        </main>
    )
}
