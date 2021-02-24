import { Injectable } from "@angular/core";
import { ApiClientService } from ".";
import { Movie } from "./models/movie";
import { MovieResponse } from "./models/movie-response";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public fetchedMovies: Movie[] = [];

  constructor(private apiClientService: ApiClientService) {
  }

  public async getAllMovies(): Promise<MovieResponse> {
    return new Promise((resolve, reject) => {
      this.apiClientService.getMovies().then((response) => {
        this.fetchedMovies = response.items.map(x => {
          const tempMovie: Movie = {
            title: x.fields.title,
            director: x.fields.director,
            country: x.fields.country,
            image: x.fields.image,
            mins: x.fields.mins,
            slug: x.fields.slug,
            year: x.fields.year
          }
          return tempMovie;
        })
        resolve({
          movies: this.fetchedMovies
        })
      })
    });
  }
}
