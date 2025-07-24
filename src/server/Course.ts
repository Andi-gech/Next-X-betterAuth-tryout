// server/Course.ts
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function getCourseById(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  try {
    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function createCourse(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Ensure the user has permission to create a course
    const body = await req.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newCourse = await prisma.course.create({
      data: {
        id: crypto.randomUUID(),
        name: title,
        Description: description,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function getCourseList(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    console.log("Fetching course list for user:", session.user.email);
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course list:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}