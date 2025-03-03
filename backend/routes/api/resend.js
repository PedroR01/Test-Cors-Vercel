import { Router } from "express";
import { Resend } from "resend";
import { validateResendData } from "../../middlewares/inputValidations.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const resendRouter = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

resendRouter.post("/", validateResendData, async (req, res) => {
  try {
    const { nombre, email, descripcion } = req.body;

    const { data, error } = await resend.emails.send({
      from: `${nombre} <onboarding@resend.dev>`,
      to: "peporobinet01@gmail.com",
      subject: "Consulta",
      html: `<p>Hola, mi nombre es ${nombre}. ${descripcion}</p>
                   <p>Mi email de contacto es: ${email}</p>`,
    });

    if (error) {
      console.error(error);
      return res.status(error.code).json({
        error: error.name,
        description:
          "Error con API al intentar enviar el mail. " + error.message,
      });
    }

    return res
      .status(200)
      .json({ description: "Correo enviado exitosamente", data });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "Error en el servidor", description: e.message });
  }
});

export default resendRouter;
