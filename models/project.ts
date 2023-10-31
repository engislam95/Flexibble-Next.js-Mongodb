import { Schema, model, models } from "mongoose";


const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  liveSiteUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
