import { db } from "@/db";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  let products: any[] = [];

  // Apply sorting logic based on the filter query
  if (searchParams.get("sort") === "title") {
    products = await db.product.findMany({
      orderBy: {
        title: "asc",
      },
    });
  } else if (searchParams.get("sort") === "price") {
    products = await db.product.findMany({
      orderBy: {
        price: "asc",
      },
    });
  } else if (searchParams.get("sort") === "subCategoryId") {
    products = await db.product.findMany({
      orderBy: {
        subCategoryId: "asc",
      },
    });
  } else if (searchParams.get("q")) {
    const searchQuery = searchParams.get("q") ?? "";
    products = await db.product.findMany({
      where: {
      title: {
        contains: searchQuery,
        mode: "insensitive",
      },
      },
    });
  } else if (searchParams.get("page")) {
    const searchQuery = searchParams.get("page") ?? "";
    products = await db.product.findMany({
      skip: (parseInt(searchQuery)-1) * 5,
      take: 5,
    });    
  } else {
    products = await db.product.findMany();
  }
  return NextResponse.json(products);
};
