import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
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
// import corsMiddleware from "./middlewares/corsMiddleware.js";

// dotenv.config();
const app = express();
// const PORT = "https://club-filete-backend-3kklxje47-pedros-projects-3596de7b.vercel.app/";
const PORT = process.env.PORT || 3001;

// Simula la variable global de dirección dinámica `__dirname` de CommonJS en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

// CORS middleware
// app.use(
//   cors({
//     origin: [
//       "https://elclubdelfilete.com.ar",
//       "http://localhost:5173"],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "https://elclubdelfilete.com.ar",
  "http://localhost:5173",
  "http://localhost:3001",
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  methods: ["POST", "GET", "UPDATE", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

// Enable preflight requests for all routes
app.options("*", cors(corsOptions));

// app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.sendStatus(204); // Responde sin contenido
// });

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
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

// export default app;
