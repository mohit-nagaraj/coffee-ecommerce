"use client"
import Link from "next/link";

import { BsPlus, BsEyeFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import axios from "axios";

const Product = ({ product }:{ product : any}) => {
  // destructure product
  const cartId= 1;
  const { id, image, category, title, price } = product;

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
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt=""
            />
          </div>
        </div>
        {/* buttons */}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={addToCart}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            href={`/shop/product?pid=${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-gray-700 drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* category, title & price */}
      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link href={`/shop/product?pid=${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>

        <h2 className="font-semibbold">₹ {price}</h2>
      </div>
    </div>
  );
};

export default Product;
