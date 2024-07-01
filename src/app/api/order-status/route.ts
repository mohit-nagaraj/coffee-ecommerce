import { db } from "@/db";
import { convertToIST } from "@/util/util";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { id, type } = body;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  if (type == "default") {
    const product = await db.order.findUnique({
      where: { id },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        payment: true,
        delivery: true,
      },
    });
    const res = {
        id: product?.id,
        delivery: {
            address: product?.delivery?.address,
            arrival: product?.delivery?.arrival ? convertToIST(product.delivery.arrival) : undefined,
            departure: product?.delivery?.departure ? convertToIST(product.delivery.departure) : undefined,
            agent: product?.delivery?.departureBoy,
            name: product?.delivery?.name,
            phone: product?.delivery?.phoneNum,
        },
        payment: {
            net_price: product?.payment?.netPrice,
            cash_paid: product?.payment?.cashPaid,
        },
        orderDetails: product?.orderDetails.map((item) => {
            return {
                id: item.id,
                image: item.product.image,
                title: item.product.title,
                price: item.product.price,
                pid: item.productId,
                amount: item.qty,
            };
        }),
    }
    return NextResponse.json({ data: res });
  }
  return NextResponse.json({ message: "Invalid type" }, { status: 400 });
};
