import express from "express";
import {
  login,
  obtenerPregunta,
  validarRespuesta,
  cambiarClave
} from "../controllers/authController.js";

const router = express.Router();

// Deben ser métodos POST (no GET)
router.post("/login", login);
router.post("/pregunta", obtenerPregunta);
router.post("/validar-respuesta", validarRespuesta);
router.post("/cambiar-clave", cambiarClave);

export default router;