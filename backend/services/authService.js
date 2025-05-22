import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const loginService = async (usuario, clave) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario o contraseña incorrectos");
  const valid = await bcrypt.compare(clave, user.clave);
  if (!valid) throw new Error("Usuario o contraseña incorrectos");
  return { usuario: user.usuario };
};

export const getPreguntaService = async (usuario) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario no encontrado");
  return { pregunta: user.pregunta };
};

export const validarRespuestaService = async (usuario, respuesta) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario no encontrado");
  if (respuesta.trim().toLowerCase() !== user.respuesta.trim().toLowerCase())
    throw new Error("Respuesta incorrecta");
  return { correcto: true };
};

export const cambiarClaveService = async (usuario, nuevaClave) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario no encontrado");
  const hash = await bcrypt.hash(nuevaClave, 10);
  user.clave = hash;
  await user.save();
  return { ok: true };
};