import { db } from "@/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { customerId } = body;

  if (!customerId) {
    return NextResponse.json(
      { message: "customerId is required" },
      { status: 400 }
    );
  }

  const cart = await db.cart.findUnique({
    where: {
      customerId: customerId,
    },
    include: {
      orderDetails: {
        orderBy: {
          id: "asc",
        },
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
  if (!cart) {
    return NextResponse.json({ message: "Cart not found" }, { status: 404 });
  }
  let total = 0;
  const updatedCart = cart.orderDetails.map((item) => {
    total += item.product.price * item.qty;
    return {
      id: item.id,
      pid: item.productId,
      image: item.product.image,
      category: item.product.category.name,
      title: item.product.title,
      price: item.product.price,
      amount: item.qty,
    };
  });
  return NextResponse.json({
    data: {
      total: total,
      cart: updatedCart,
      cart_id: cart.id,
    },
  });
};

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const { cartId } = body;
  try {
    await db.orderDetail.deleteMany({
      where: {
        cartId: cartId,
      },
    });
    return NextResponse.json({
      message: "success",
    });
  } catch (e) {
    return NextResponse.json({
      message: "error",
    });
  }
};
