import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "CoffeeBlend",
  description: "The best coffee in the world",
};
export default function Home() {
  return (
    <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
      <div className="container mx-auto flex justify-around h-full">
        {/* text */}
        <div className="flex flex-col justify-center pt-14">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Hot Trend
          </div>
          <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">Fresh Coffee Brews<br />
          <span className="font-light">new products</span></h1>
          <Link href={'/shop'} className='self-start uppercase font-semibold border-b-2 border-primary'>Discover More</Link>
        </div>
      </div>
    </section>
  );
}
