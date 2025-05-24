import { Router } from "express";
import {
  login,
  obtenerPregunta,
  validarRespuesta,
  cambiarClave
} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/obtener-pregunta", obtenerPregunta);
router.post("/validar-respuesta", validarRespuesta);
router.post("/cambiar-clave", cambiarClave);

export default router;