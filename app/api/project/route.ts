import { connectToDB } from "@/utils/database";
import Project from "@/models/project";

export const GET = async () => {
  try {
    await connectToDB();
    const projects = await Project.find({}).populate("creator");

    return new Response(JSON.stringify(projects), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all projects", {
      status: 500,
    });
  }
};
