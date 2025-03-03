import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import resendRouter from "./routes/api/resend.js";
import loginRouter from "./routes/user/auth/login.js";
import logoutRouter from "./routes/user/auth/logout.js";
import registerRouter from "./routes/user/auth/signUp.js";
import confirmAuthUserRouter from "./routes/user/webhooks/confirmAuthUser.js";
import blogInfoRouter from "./routes/blog/blogInfo.js";
import blogImgRouter from "./routes/blog/blogBucket.js";
import logedUserCookiesRouter from "./routes/user/cookies/userCookie.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Simula la variable global de dirección dinámica `__dirname` de CommonJS en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>Servidor ElClubDelFilete</title>
      </head>
    </html>
  `;
  res.send(htmlResponse);
});

// Email API (RESEND)
app.use("/api/submitResend", resendRouter);

// USER
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", registerRouter);
app.use("/webhook/confirmed_auth_user", confirmAuthUserRouter);

// COOKIES
app.use("/api/verify", logedUserCookiesRouter);

// BLOGS
app.use("/api/blogs", blogInfoRouter);
app.use("/api/storage", blogImgRouter);

// app.use("/protected", protectedRouter);

// Ruta para manejar cualquier otra solicitud (404)
app.use((req, res) => {
  res.status(404).send("Recurso no encontrado");
});

app.use(errorHandler); // Esto debe ir al final para manejar cualquier error no capturado

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
