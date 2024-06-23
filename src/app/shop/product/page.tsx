"use client";
import Footer from "@/components/Footer";
import { products } from "@/util/dummy";
import { useSearchParams } from "next/navigation";

const ProductDetails = () => {
  // get the product id from url
  const searchParams = useSearchParams();
  const id = searchParams.get("pid");
  console.log(id);

  //get the single product based on id
  if (!id)
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  const product = products.find((item) => {
    return item.id === parseInt(id.toString());
  });

  // if product is not found
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  // destructure product
  const { title, price, description, image } = product;
  return (
    <div>
      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto">
          {/* image and text wrapper */}
          <div className="flex flex-col lg:flex-row items-center">
            {/* image */}
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img className="max-w-[200px] lg:max-w-xs" src={image} alt="" />
            </div>
            {/* text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {title}
              </h1>
              <div className="text-2xl text-primary font-medium mb-6">
                ₹ {price}
              </div>
              <p className="mb-8">{description}</p>
              <button
                onClick={() => {}}
                className="bg-primary py-4 px-8 text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;