import { db } from '@/db';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }
  const product = await db.product.findUnique({
    where: { id },
  });
  return NextResponse.json({ data: product });
}
