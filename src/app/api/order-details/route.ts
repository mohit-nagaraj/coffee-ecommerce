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
  if(quantity==0){
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
    message: "success"
  });
};
