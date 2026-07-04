import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "";
  
  const p = await prisma.pendaftar.findMany({
    where: {
      nama_lengkap: { contains: name, mode: "insensitive" }
    }
  });
  
  return NextResponse.json(p);
}
