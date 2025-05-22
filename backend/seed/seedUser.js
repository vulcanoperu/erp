import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { connectDB } from "../config/db.js";

dotenv.config();

async function seed() {
  await connectDB();
  const hash = await bcrypt.hash("123", 10);
  await User.deleteMany({ usuario: "vulcano" });
  await User.create({
    usuario: "vulcano",
    clave: hash,
    pregunta: "¿Cuál es el nombre de mi mascota?",
    respuesta: "cafecito"
  });
  console.log("Usuario 'vulcano' creado con clave '123'");
  mongoose.disconnect();
}

seed();