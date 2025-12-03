import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
    gender: { type: String, required: false },
    Weight: { type: String, required: false },
   profile: { type: String, required: false },
    height: { type: String, required: false },
  birthday: { type: String, required: false },
  password: { type: String, required: true },
});


export default mongoose.model("User", userSchema);
