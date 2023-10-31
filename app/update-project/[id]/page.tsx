import { redirect } from "next/navigation";

import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import { Modal } from "@/components";



const UpdateProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/")
  const result = await getProjectDetails(id) ;
  if (!result) return (
    <p className="no-result-text">Failed to fetch project info</p>
  )

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" session={session} project={result}/>
    </Modal>
  )
}

export default UpdateProject
