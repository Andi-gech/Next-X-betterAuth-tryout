import { withRole } from "@/lib/withRole";
import {  createCourse, getCourseList } from "@/server/Course";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return withRole(req, [ "user"], async () => getCourseList(req));
}
export async function POST(req: NextRequest) {
  return withRole(req, ["user", "instructor"], async () => createCourse(req));
}
