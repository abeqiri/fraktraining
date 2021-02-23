import { Injectable } from "@angular/core";
import { ApiClientService } from ".";
import { Movie } from "./models/movie";
import { MovieResponse } from "./models/movie-response";

@Injectable()
export class MovieService {
  /**
   *
   */
  constructor(private apiClientService: ApiClientService) {}

  public getAllMovies(): Promise<MovieResponse> {
    return new Promise((resolve, reject) => {
      this.apiClientService.getMovies().then((response) => {
        resolve({
          movies: response.items.map(x => {
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
        })
      })
    });
  }
}
