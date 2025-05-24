import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  usuario: { type: String, unique: true, required: true },
  clave: { type: String, required: true },
  preguntaSecreta: { type: String, required: true },
  respuestaSecreta: { type: String, required: true }
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("clave")) {
    this.clave = await bcrypt.hash(this.clave, 10);
  }
  if (this.isModified("respuestaSecreta")) {
    this.respuestaSecreta = await bcrypt.hash(this.respuestaSecreta, 10);
  }
  next();
});

UserSchema.methods.validarClave = function (clave) {
  return bcrypt.compare(clave, this.clave);
};

UserSchema.methods.validarRespuesta = function (respuesta) {
  return bcrypt.compare(respuesta, this.respuestaSecreta);
};

const User = mongoose.model("User", UserSchema);
export default User;