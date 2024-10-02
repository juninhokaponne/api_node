import { Router } from "express";
import userRoute from "./users";
import filmsRoute from "./films";

const router = Router();

router.use(userRoute);
router.use(filmsRoute);

export default router;
