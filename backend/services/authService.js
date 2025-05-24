import User from "../models/User.js";

export const loginService = async (usuario, clave) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario o clave incorrectos");
  const esValido = await user.validarClave(clave);
  if (!esValido) throw new Error("Usuario o clave incorrectos");
  return { usuario: user.usuario };
};

export const getPreguntaService = async (usuario) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario no encontrado");
  return { preguntaSecreta: user.preguntaSecreta };
};

export const validarRespuestaService = async (usuario, respuesta) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario no encontrado");
  const esValido = await user.validarRespuesta(respuesta);
  if (!esValido) throw new Error("Respuesta incorrecta");
  return { ok: true };
};

export const cambiarClaveService = async (usuario, nuevaClave) => {
  const user = await User.findOne({ usuario });
  if (!user) throw new Error("Usuario no encontrado");
  user.clave = nuevaClave;
  await user.save();
  return { ok: true };
};