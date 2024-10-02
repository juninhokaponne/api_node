import e, { Router } from "express";

import { MovieController } from "@controllers/films/filmController";
import { MovieService } from "@services/films/filmService";

const router = Router();

const service = new MovieService();
const controller = new MovieController(service);

router.get("/films", (req, res) => controller.getMovies(req, res));

export default router;
