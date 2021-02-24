import { Injectable } from "@angular/core";
import { SortField } from "src/app/core/enums/sort-field.enum";
import { SortOrder } from "src/app/core/enums/sort-order.enum";
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
        });
        resolve({
          movies: this.fetchedMovies
        })
      })
    });
  }

  public getAllMoviesExcept(movieSlug: string) {
    return this.fetchedMovies.filter(x => x.slug !== movieSlug);
  }

  public getMovieBySlug(movieSlug: string): Movie {
    return this.fetchedMovies.find(x => x.slug === movieSlug);
  }

  public searchMovies(searchTerm: string): Movie[] {
    return this.fetchedMovies.filter(x => x.title.trim().toLowerCase().includes(searchTerm.toLowerCase())
                      || x.director.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  public sort(sortField: SortField, sortOrder: SortOrder): Movie[] {
    switch(sortField) {
      case SortField.Title:
        return this.sortByTitle(sortOrder);
      case SortField.Mins:
        return this.sortByMinutes(sortOrder);
      case SortField.Year:
        return this.sortByYear(sortOrder);
    }
  }

  private sortByTitle(sortOrder: SortOrder): Movie[] {
    sortOrder = sortOrder == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    return this.fetchedMovies.sort((firstMovie, secondMovie) => {
      const titleA = firstMovie.title.trim().toUpperCase();
      const titleB = secondMovie.title.trim().toUpperCase();
      if (titleA < titleB) {
        return sortOrder === SortOrder.Ascending ? -1 : 1;
      }
      if (titleA > titleB) {
        return sortOrder === SortOrder.Ascending ? 1 : -1;
      }

      return 0;
    });
  }

  private sortByMinutes(sortOrder: SortOrder): Movie[] {
    sortOrder = sortOrder == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    return this.fetchedMovies.sort((firstMovie, secondMovie) =>
                  sortOrder == SortOrder.Ascending ? firstMovie.mins - secondMovie.mins : secondMovie.mins - firstMovie.mins);
  }

  private sortByYear(sortOrder: SortOrder): Movie[] {
    sortOrder = sortOrder == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    return this.fetchedMovies.sort((firstMovie, secondMovie) => {
      const firstMovieYear = firstMovie.year;
      const secondMovieYear = secondMovie.year;
      if (firstMovieYear < secondMovieYear) {
        return sortOrder == SortOrder.Ascending ? -1 : 1;
      }
      if (firstMovieYear > secondMovieYear) {
        return sortOrder == SortOrder.Ascending ? 1 : -1;
      }
      return 0;
    });
  }
}
