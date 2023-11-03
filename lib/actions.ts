import { ProjectForm } from "@/common.types";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    const variables = {
      ...form,
      image: imageUrl.url,
      createdBy: creatorId,
    };

    try {
      const response = await fetch("/api/project/new", {
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        body: JSON.stringify({
          ...variables,
        }),
      });

      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      throw error;
    }
  }
};

export const getProjectDetails = async (id: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/project/${id}`);
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};

export const getUserProjects = async (id: string, last?: number) => {
  try {
    const response = await fetch(`${serverUrl}/api/users/${id}/projects`);
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/project/${id.toString()}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (project: ProjectForm, id: string) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...project };
  const isUploadingNewImage = isBase64DataURL(project.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(project.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  try {
    const response = await fetch(`${serverUrl}/api/project/${id.toString()}`, {
      method: "PATCH",
      body: JSON.stringify({
        project,
      }),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};
