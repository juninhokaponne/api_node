import { Router } from "express";
import userRoute from "./users";

const router = Router();

router.use(userRoute);

export default router;
