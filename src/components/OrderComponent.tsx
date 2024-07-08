"use client";
import { db } from "@/db";
import axios from "axios";
import { useEffect, useState } from "react";

const OrderComponent = () => {
  const [orders, setOrders] = useState<
    { id: number; time: Date; customerId: number; product: {image: string;title:string;price:number;}; }[]
  >([]);

  const getOrders = async () => {
   await axios.get("/api/order-details").then((res) => {
      setOrders(res.data);
      console.log(res.data)
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-8 py-6 shadow">
      <h4 className=" text-xl font-semibold text-black ">Recent Orders</h4>
      <div className="box-container-overflow h-96 overflow-auto">
        {orders.map((order) => (
         <div className="flex w-full gap-4 mb-2 p-2">
            <img className="w-12 h-12 rounded-full border-2 p-1" src={order.product.image} />
            <div className="">
              <h4 className=" text-md font-semibold text-black ">Order ID: {order.id}</h4>
              <span className="text-sm font-medium text-gray-400">{order.product.title}</span>
            </div>
            <div className=" ml-auto">
            ₹{order.product.price}
            </div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default OrderComponent;
