import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const projects = await Project.find({
      creator: params.id,
    }).populate("creator");

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects per user" },
      { status: 500 }
    );
  }
};
