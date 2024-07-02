"use client";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa6";
import { MdRefresh } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const page = () => {
  const { orderid } = useParams();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "default";
  const pay_id= searchParams.get("pay_id") || null;
  const amount = searchParams.get("amount") || 0;
  const [res, setRes] = useState<any>({});

  const getDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/order-status", {
        type: type,
        id: parseInt(orderid.toString()),
        pay_id: pay_id,
        amount: amount,
      });
      setRes(data.data);
    } catch (e) {
      toast.error("Error fetching order details");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <section className="pt-20">
      <title>CoffeeBlend Order</title>
      <div className="h-full pb-10">
        <div className="h-full container mx-auto">
          <div>
            <h1 className="text-3xl font-semibold ">{type=='success'?'Order Placed Sucessfully🍵':'Your Order'}</h1>
            <div className="flex gap-2 mb-4 items-center">
              <h2 className=" text-xl text-gray-500">
                {"Order Number #" + orderid}
              </h2>
              <FaRegCopy
                className="text-gray-500 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(orderid.toString());
                  toast.success("Copied to clipboard");
                }}
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="h-full flex gap-8">
              <div className="flex flex-1 flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[560px] overflow-y-auto overflow-x-hidden border-b">
                {res?.orderDetails?.length == 0 ? (
                  <div className="text-center text-lg font-semibold">
                    Order is empty
                  </div>
                ) : (
                  res?.orderDetails?.map((item: any) => {
                    return (
                      <CartItem
                        setLoading={setLoading}
                        item={item}
                        key={item.id}
                        type="display"
                      />
                    );
                  })
                )}
              </div>
              <div className="flex flex-1 flex-col gap-y-3  mt-4">
                <div className="flex flex-col gap-3 py-4 mb-4 border-b border-gray-200">
                  <div>
                    <h1 className="text-xl font-semibold">Payment details</h1>
                    {type == "cancel" && (
                      <div className="text-sm text-red-400">
                        Your payment didnt go through. You can retry once again.
                        If any money was debited, it will be credited back to
                        you soon.
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col g-1 w-44">
                      <p className=" text-gray-600 flex justify-between">
                        Net Price:
                        <span className=" font-semibold">
                          {res.payment?.net_price}
                        </span>
                      </p>
                      <p className=" text-gray-600 flex justify-between">
                        Cash Paid:
                        <span className=" font-semibold">
                          {res.payment?.cash_paid}
                        </span>
                      </p>
                    </div>
                    <div>
                      <div
                        onClick={() => {}}
                        className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium cursor-pointer"
                      >
                        {res.payment?.cash_paid !== 0 ? (
                          <div className="flex gap-1 items-center justify-center">
                            Payment succesful
                            <TiTick />
                          </div>
                        ) : (
                          <div className="flex gap-1 items-center justify-center">
                            Retry Payment
                            <MdRefresh />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mb-10">
                  <h1 className="text-xl font-semibold mb-2">
                    Shipping Details
                  </h1>
                  <div className="flex gap-3">
                    <div className="left-col ">
                      <img src="/progress.png" className="w-4" />
                    </div>
                    <div className="right-col flex flex-col gap-4">
                      <div>
                        <h2 className=" text-xl">Shipper details</h2>
                        <div className="text-gray-500">
                          <p>
                            CoffeeBlend, Delivery agent: {res.delivery?.agent}
                          </p>
                          <p className="text-gray-900">
                            Expected Packed Time:{" "}
                            {res.delivery?.departure &&
                              new Date(
                                res.delivery.departure
                              ).toLocaleDateString("en-US", {
                                weekday: "long", // "Monday"
                                year: "numeric", // "2021"
                                month: "long", // "July"
                                day: "numeric", // "19"
                              })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h2 className=" text-xl">Customer details</h2>
                        <div className="text-gray-500">
                          <p>
                            {res.delivery?.name}, {res.delivery?.phone}
                          </p>
                          <p>{res.delivery?.address}</p>
                          <p className="text-gray-900">
                            Expected Delivery:{" "}
                            {res.delivery?.arrival &&
                              new Date(res.delivery.arrival).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long", // "Monday"
                                  year: "numeric", // "2021"
                                  month: "long", // "July"
                                  day: "numeric", // "19"
                                }
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex w-full justify-between items-center">
                  <div className="font-semibold">
                    <span className="mr-2">Total paid:</span> ₹ {0}
                  </div>
                  <div
                    onClick={() => {}}
                    className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
                  >
                    <FiTrash2 />
                  </div>
                </div> */}

                {/* <div
                  onClick={()=>{}}
                  className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium cursor-pointer"
                >
                  Checkout
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default page;
