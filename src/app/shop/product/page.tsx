"use client";
import React, { Suspense, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const ProductDetailsContent = () => {
  // const user = 8055;
  const cartId= 1;
  // get the product id from url
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("pid") || "0");
  const [product, setProduct] = useState<any>();

  const getProduct = async () => {
    const { data } = await axios.post("/api/product-details", { id });
    setProduct(data.data);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const addToCart = async () => {
    await axios.post("/api/order-details", {
      cartId: cartId,
      productId: id,
      qty: 1,
    });
    toast.success('Added into cart')
  }
  return (
    <div>
      <title>{"CoffeeBlend - " + product?.title}</title>
      {product?.id ? (
        <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
          <div className="container mx-auto">
            {/* image and text wrapper */}
            <div className="flex flex-col lg:flex-row items-center">
              {/* image */}
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <img
                  className="max-w-[200px] lg:max-w-xs"
                  src={product?.image}
                  alt=""
                />
              </div>
              {/* text */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                  {product?.title}
                </h1>
                <div className="text-2xl text-primary font-medium mb-6">
                  ₹ {product?.price}
                </div>
                <p className="mb-8">{product?.description}</p>
                <button
                  onClick={addToCart}
                  className="bg-primary py-4 px-8 text-white"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="h-screen flex justify-center items-center">
          <title>CoffeeBlend</title>
          <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

const ProductDetails = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
};

export default ProductDetails;
