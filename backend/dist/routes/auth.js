import { Router } from "express";
import { signUp } from "../controller/authController.js";
export const authRouter = Router();
authRouter.post("/signup", signUp);
//# sourceMappingURL=auth.js.map