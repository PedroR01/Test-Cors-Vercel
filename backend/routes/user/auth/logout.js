import { Router } from "express";
import { UserRepository } from "../userRepository.js";

const logoutRouter = Router();

logoutRouter.post("/", async (req, res,next) => {
  try {
    const accessToken = req.cookies["access_token"];
    const data = await UserRepository.logOut(accessToken,res);
    res.send(data);
  } catch (e) {
    next(e)
  }
});

export default logoutRouter;
