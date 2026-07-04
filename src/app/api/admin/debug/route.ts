import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const p = await prisma.pendaftar.findMany({
    where: {
      nama_lengkap: { contains: 'Lalu Muhamad Rizky Ananda' }
    }
  });
  return NextResponse.json(p);
}
