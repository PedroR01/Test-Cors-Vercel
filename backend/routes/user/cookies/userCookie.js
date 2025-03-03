import { Router } from "express";
import { UserRepository } from "../userRepository.js";
import { AppError } from "../../../errors/appError.js";
const logedUserCookiesRouter = Router();

logedUserCookiesRouter.post("/", async (req, res, next) => {
  try {
    const accessToken = req.cookies["access_token"];
    const refreshToken = req.cookies["refresh_token"];

    // Verificar si existen cookies
    if (!accessToken && !refreshToken) {
      throw new AppError(
        "unauthorized",
        401,
        "No hay sesión activa, inicie sesión nuevamente"
      );
    }
    const data = await UserRepository.refreshUserCookie(
      accessToken,
      refreshToken,
      res
    );
    res.send(data);
  } catch (e) {
    next(e);
  }
});

export default logedUserCookiesRouter;
