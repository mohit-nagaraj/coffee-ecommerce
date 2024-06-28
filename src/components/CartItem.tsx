"use client";
import axios from "axios";
import Link from "next/link";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";

const CartItem = ({ item, setLoading, getCart }: { item: any; setLoading: any; getCart:any; }) => {
  // destructure item
  const { id, title, image, price, amount } = item;
  
  const handleReduce = async() => {
    setLoading(true);
    if (amount > 1) {
      await axios
        .patch(`/api/order-details`, { orderDetailId: id, quantity: amount - 1 })
        .then(async() => {
          await getCart();
        }).finally(() => setLoading(false));
    } else {
      await axios.patch(`/api/order-details`, { orderDetailId: id, quantity: 0 })
      .then(() => {
        // remove item from cart;
        
      }).finally(() => setLoading(false));
    }
  };
  const handleIncrease = async() => {
    setLoading(true);
    await axios.patch(`/api/order-details`, { orderDetailId: id, quantity: amount + 1 })
    .then(async() => {
      await getCart();
    }).finally(() => setLoading(false));
  };
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* image */}
        <Link href={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          {/* title and remove icon */}
          <div className="flex justify-between mb-2">
            {/* title */}
            <Link
              href={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            {/* remove icon */}
            <div onClick={() => {}} className="text-xl cursor-pointer">
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* quantity */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                onClick={handleReduce}
                className="h-full flex-1 flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <div
                onClick={handleIncrease}
                className="h-full flex flex-1 justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item price */}
            <div className="flex flex-1 justify-around items-center">
              ₹ {price}
            </div>
            {/* final price */}
            <div className="flex flex-1 justify-end items-center text-primary font-medium">{`₹ ${
              price * amount
            }`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
