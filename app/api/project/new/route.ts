import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    title,
    description,
    image,
    liveSiteUrl,
    githubUrl,
    category,
    createdBy,
  } = await req.json();
  try {
    await connectToDB();

    const newProject = new Project({
      title,
      description,
      image,
      liveSiteUrl,
      githubUrl,
      category,
      creator: createdBy,
    });
    await newProject.save();
    return new Response(JSON.stringify(newProject), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create new Project", {
      status: 500,
    });
  }
};
