import {
  loginService,
  getPreguntaService,
  validarRespuestaService,
  cambiarClaveService
} from "../services/authService.js";

export const login = async (req, res) => {
  const { usuario, clave } = req.body;
  try {
    const result = await loginService(usuario, clave);
    res.json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

export const obtenerPregunta = async (req, res) => {
  const { usuario } = req.body;
  try {
    const result = await getPreguntaService(usuario);
    res.json(result);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export const validarRespuesta = async (req, res) => {
  const { usuario, respuesta } = req.body;
  try {
    const result = await validarRespuestaService(usuario, respuesta);
    res.json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

export const cambiarClave = async (req, res) => {
  const { usuario, nuevaClave } = req.body;
  try {
    const result = await cambiarClaveService(usuario, nuevaClave);
    res.json(result);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};