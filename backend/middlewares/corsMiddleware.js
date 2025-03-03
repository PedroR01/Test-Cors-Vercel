import cors from "cors";

const corsMiddleware = cors({
  origin: ["http://localhost:5173", "https://elclubdelfilete.com.ar"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true, // Esto permite enviar cookies
});

export default corsMiddleware;
