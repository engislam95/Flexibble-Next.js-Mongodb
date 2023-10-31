import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const project = await Project.findById(params.id).populate("creator");
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch project" },
      { status: 500 }
    );
  }
};

//  Delete

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Project.findByIdAndRemove(params.id);
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
};

// Update

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { project } = await req.json();
  try {
    await connectToDB();
    let existingProject = await Project.findById(params.id);
    if (!project)
      return new Response("Project not found", {
        status: 404,
      });
    existingProject.title = project.title;
    existingProject.description = project.description;
    existingProject.image = project.image;
    existingProject.liveSiteUrl = project.liveSiteUrl;
    existingProject.githubUrl = project.githubUrl;
    existingProject.category = project.category;

    await existingProject.save();

    return NextResponse.json(existingProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
};
