import { db } from "@/db";
import { addTime, convertToIST } from "@/util/util";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST  = async (req: NextRequest) =>{
    const body = await req.json();
    const date = new Date();
    const isoDateString = convertToIST(date);
    // todo
    // 1. create a new delivery
    // take input from the body
    const departure_time = convertToIST(addTime(date,1))
    const randomInteger = Math.floor(Math.random() * 5) + 2;
    const arrival_time = convertToIST(addTime(date,randomInteger))
    
    // 2. create new payment
    // keep default values
    // start a stripe session
    // create a order
    // copy order detail put it into order remove from cart
    return NextResponse.json({
        message: "sucess",
      });
}