import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  avatarUrl: {
    type: String,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 1000,
  },
  githubUrl: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const User = models?.User || model("User", UserSchema);
export default User;
