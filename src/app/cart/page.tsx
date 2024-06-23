"use client";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import { cart } from "@/util/dummy";
import Link from "next/link";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const page = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <section className="h-screen pt-20">
      <div className="h-full pb-10">
        <div className="h-full container mx-auto">
          <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>
          <div className="h-full flex gap-8">
            <div className="flex flex-1 flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[560px] overflow-y-auto overflow-x-hidden border-b">
              {cart.length == 0 ? (
                <div className="text-center text-lg font-semibold">
                  Cart is empty
                </div>
              ) : (
                cart.map((item) => {
                  return <CartItem item={item} key={item.id} />;
                })
              )}
            </div>
            <div className="flex flex-1 flex-col gap-y-3  mt-4">
              <div className="flex flex-col gap-4 mb-10">
                <h1 className="text-xl font-semibold mb-2">Shipping Details</h1>
                <div className="flex w-full gap-8">
                  <div className="form-control flex flex-1 flex-col">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="p-4 rounded-md border border-gray-300"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-control flex flex-1 flex-col">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      className="p-4 rounded-md border border-gray-300"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-control flex flex-col">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="p-4 rounded-md border border-gray-300"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="font-semibold">
                  <span className="mr-2">Subtotal:</span> ₹{" "}
                  {parseFloat("1000").toFixed(2)}
                </div>
                <div
                  onClick={() => {}}
                  className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
                >
                  <FiTrash2 />
                </div>
              </div>

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
      <Footer />
    </section>
  );
};

export default page;
