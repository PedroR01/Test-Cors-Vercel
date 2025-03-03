import { Router } from "express";
import { UserRepository } from "../userRepository.js";

const confirmAuthUserRouter = Router();

// Este endpoint solamente es llamado por el Webhook de Supabase solo cuando se crea o modifica la info de un usuario autenticado
confirmAuthUserRouter.post("/", async (req, res) => {
  try {
    const { type, record, old_record } = req.body; // No hace falta hacer un AWAIT, ya que la funcion express.json() ya se encarga de ello.

    // Verifica que el evento sea de tipo actualización en la tabla de usuarios
    if (type === "UPDATE" && record.email_confirmed_at) {
      const { id: userId, email: newEmail } = record;
      const data = await UserRepository.createProfile({
        userId,
        newEmail,
        old_record,
      });
      //return res.status(data.status).json({ message: data.message });
      /*
        if(data.status === 200)
            return res.status(200).json({ message: data.message });
        else if(data.status === 500)
            return res.status(500).json({ error: data.message });
        */
    }
    return res
      .status(200) // 400
      .json({ error: "Invalid event or no action required" }); // Esto está mal, porque aunque se ejecute correctamente el llamado, devuelve 400 en algunos casos.
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
});

export default confirmAuthUserRouter;
