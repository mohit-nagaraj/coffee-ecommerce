"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "./CartItem";
import axios from "axios";

const Sidebar = ({
  isOpen,
  closeSideBar,
}: {
  isOpen: boolean;
  closeSideBar: any;
}) => {
  //get user id from authentication
  const user = 8055;
  const [cart, setCart] = useState<{ id: number }[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    const { data } = await axios.post(`/api/cart-details`, {
      customerId: user,
    });
    setCart(data.data.cart);
    setTotal(data.data.total);
  };

  useEffect(() => {
    getCart();
  }, [user]);

  return (
    <div
      className={
        isOpen ? "w-screen fixed top-0 h-screen bg-slate-900/50 z-10" : ""
      }
    >
      <div
        className={`${
          isOpen ? "right-0 z-10" : "-right-full z-10"
        } "w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
      >
        <div className="flex items-center justify-between py-6 border-b">
          <div className="uppercase text-sm font-semibold">
            Shopping Bag ({cart.length})
          </div>
          <div
            onClick={closeSideBar}
            className="cursor-poniter w-8 h-8 flex justify-center items-center"
          >
            <IoMdArrowForward className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            cart.map((item) => {
              return (
                <CartItem getCart={getCart} setLoading={setLoading} item={item} key={item.id} />
              );
            })
          )}
        </div>
        <div className="flex flex-col gap-y-3  mt-4">
          <div className="flex w-full justify-between items-center">
            {/* total */}
            <div className="font-semibold">
              <span className="mr-2">Subtotal:</span> ₹ {total}
            </div>
            {/* clear cart icon */}
            <div
              onClick={() => {}}
              className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            >
              <FiTrash2 />
            </div>
          </div>
          <div onClick={closeSideBar}>
            <Link
              href={"/cart"}
              className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
            >
              View Cart
            </Link>
          </div>
          <div onClick={closeSideBar}>
            <Link
              href={"/"}
              className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
