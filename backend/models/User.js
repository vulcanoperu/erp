import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

export default User;