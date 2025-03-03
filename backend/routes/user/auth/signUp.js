import { Router } from "express";
import { UserRepository } from "../userRepository.js";

const signUpRouter = Router();

signUpRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const data = await UserRepository.createAuthenticatedUser({
      username,
      email,
      password,
    });
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default signUpRouter;
