import { redirect } from "next/navigation";
import { Modal, ProjectForm } from "@/components";
import { getCurrentUser } from "@/lib/session";

const CreateProject = async () => {
  const session = await getCurrentUser();
  if(!session?.user)
  {
    return <>{JSON.stringify(session)}</>
  }
  return (
    <Modal>
      <h3 className="modal-head-text"> Create a new project</h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
