import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        year: body.year,
        title: body.title,
        description: body.description,
        tags: JSON.stringify(body.tags),
        imgSrc: body.imgSrc || null,
        liveSiteUrl: body.liveSiteUrl || null,
        sourceCodeUrl: body.sourceCodeUrl || null,
        layout: body.layout || "1-col",
        order: body.order || 0,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}