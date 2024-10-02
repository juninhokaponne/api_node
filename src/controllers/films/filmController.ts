import { Request, Response } from "express";
import { MovieService } from "@services/films/filmService";

export class MovieController {
  constructor(private service: MovieService) {}

  async getMovies(req: Request, res: Response) {
    try {
      const movies = await this.service.getAllMovies();
      res.json(movies);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
