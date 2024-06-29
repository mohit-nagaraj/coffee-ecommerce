import { db } from "@/db";
import { departure_names } from "@/util/dummy";
import { addTime, convertToIST } from "@/util/util";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const {
    customer_id,
    delivery_name,
    delivery_phoneNum,
    delivery_address,
    cart_id,
    total,
  } = body;
  // const date = new Date();

  // const isoDateString = convertToIST(date);

  // const res = await db.order.create({
  //   data: {
  //     time: isoDateString,
  //     customer: {
  //       connect: {
  //         id: customer_id,
  //       },
  //     },
  //   },
  // });
  // const cart = await db.cart.findUnique({
  //   where: {
  //     id: cart_id,
  //   },
  //   include: {
  //     orderDetails: true,
  //   },
  // });

  // const orderDetails = cart?.orderDetails ?? [];

  // await db.cart.update({
  //   where: {
  //     id: cart_id,
  //   },
  //   data: {
  //     orderDetails: {
  //       disconnect: orderDetails.map((orderDetail) => ({
  //         id: orderDetail.id,
  //       })),
  //     },
  //   },
  // });

  // await db.order.update({
  //   where: {
  //     id: res.id,
  //   },
  //   data: {
  //     orderDetails: {
  //       connect: orderDetails.map((orderDetail) => ({
  //         id: orderDetail.id,
  //       })),
  //     },
  //   },
  // });
  // const departure_time = convertToIST(addTime(date, 1));
  // const randomInteger = Math.floor(Math.random() * 5) + 2;
  // const arrival_time = convertToIST(addTime(date, randomInteger));
  // departure_names;
  // const randomIndex = Math.floor(Math.random() * departure_names.length);
  // const departure_name = departure_names[randomIndex];

  // const delres = await db.delivery.create({
  //   data: {
  //     order: {
  //       connect: {
  //         id: res.id,
  //       },
  //     },
  //     departure: departure_time,
  //     arrival: arrival_time,
  //     departureBoy: departure_name,
  //     name: delivery_name,
  //     phoneNum: delivery_phoneNum,
  //     address: delivery_address,
  //   },
  // });

  // const payres = await db.payment.create({
  //   data: {
  //     order: {
  //       connect: {
  //         id: res.id,
  //       },
  //     },
  //     netPrice: total,
  //     cashPaid: 0,
  //   },
  // });

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "inr",
          unit_amount: total*100,
          product_data: {
            name: "CoffeeBlend",
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://sem4-proj.vercel.app/?success=true`,
      cancel_url: `https://sem4-proj.vercel.app/?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err:any) {
    console.log(err);
    return NextResponse.error();
  }
};
