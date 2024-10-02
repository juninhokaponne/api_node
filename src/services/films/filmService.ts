import axios from "axios";

export class MovieService {
  private apiBaseUrl = "https://swapi.dev/api/films";

  async getMovieById(id: number) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/${id}`);
      const { title, opening_crawl, director, producer, release_date } =
        response.data;

      return {
        title,
        opening_crawl,
        director,
        producer,
        release_date,
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch movie ${id}: ${error.message}`);
    }
  }

  async getAllMovies() {
    const moviePromises = [];

    for (let i = 1; i <= 3; i++) {
      moviePromises.push(this.getMovieById(i));
    }

    return Promise.all(moviePromises);
  }
}
