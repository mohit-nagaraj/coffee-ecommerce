import Footer from "@/components/Footer";
import Product from "@/components/Product";
import { db } from "@/db";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "CoffeeBlend - All Products",
    description: "Coffee Products for all coffee lovers",
  };
const page = async() => {
  const products = await db.product.findMany()
  return (
    <section className="pt-20">
        <div className=" pb-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => {
              return (
                <Product product={product} key={product.id}/>
              );
            })}
          </div>
        </div>
        </div>
        <Footer />
      </section>
  )
}

export default page
