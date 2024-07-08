import { db } from "@/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const body = await req.json();
  const { orderDetailId, quantity } = body;

  if (!orderDetailId) {
    return NextResponse.json(
      { message: "customerId is required" },
      { status: 400 }
    );
  }
  if (quantity == 0) {
    await db.orderDetail.delete({
      where: {
        id: orderDetailId,
      },
    });
  } else {
    await db.orderDetail.update({
      where: {
        id: orderDetailId,
      },
      data: {
        qty: quantity,
      },
    });
  }

  return NextResponse.json({
    message: "success",
  });
};

export const POST = async (req: NextRequest) => {
  // to insert a new order detail for existing cart
  const body = await req.json();
  const { productId, qty, cartId } = body;
  //check if the product exists in the cart
  try {
    const orderDetail = await db.orderDetail.findFirst({
      where: {
        cartId: cartId,
        productId: productId,
      },
    });
    if (orderDetail) {
      await db.orderDetail.update({
        where: {
          id: orderDetail.id,
        },
        data: {
          qty: orderDetail.qty + qty,
        },
      });
    } else {
      await db.orderDetail.create({
        data: {
          qty: qty,
          product: {
            connect: {
              id: productId,
            },
          },
          Cart: {
            connect: {
              id: cartId,
            },
          },
        },
      });
    }
    return NextResponse.json({
      message: "success",
    });
  } catch (e) {
    return NextResponse.json({
      message: "error",
    });
  }
};

export const GET = async () => {
  const allOrderDetails = await db.orderDetail.findMany(
    {
      include: {
        product: true,
      },
      // limit to 10 order details
      take: 10,
      //reverse order
      orderBy: {
        id: "desc",
      },
    }
  );
  return NextResponse.json(allOrderDetails);
}
