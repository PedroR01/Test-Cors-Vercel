import { Router } from "express";
import { UserRepository } from "../userRepository.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const data = await UserRepository.logIn({
      username,
      password,
      res,
    });
    res.send(data);
    // res.status(200).send(username);
  } catch (err) {
    next(err);
  }
});
export default loginRouter;
