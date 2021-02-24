import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortField } from 'src/app/core/enums/sort-field.enum';
import { SortOrder } from 'src/app/core/enums/sort-order.enum';
import { Movie } from 'src/app/services/cm-api/models/movie';
import { MovieService } from 'src/app/services/cm-api/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public titleSortOrder: SortOrder = SortOrder.Ascending;
  public yearSortOrder: SortOrder = SortOrder.Ascending;
  public minsSortOrder: SortOrder = SortOrder.Ascending;
  public sortField: SortField = SortField.Title;
  searchField: FormControl = new FormControl();

  public movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().then((response) => {
      this.movies = response.movies.sort((a, b) => a.title.localeCompare(b.title));
    });

      this.searchField.valueChanges
        .subscribe((searchTerm: string) => {
          this.movies = this.movieService.fetchedMovies.filter(x => x.title.trim().toLowerCase().includes(searchTerm.toLowerCase())
                                                                    || x.director.toLowerCase().includes(searchTerm.toLowerCase()));
        });
  }

  public sort(sortField: SortField) {
    this.sortField = sortField;
    switch(this.sortField) {
      case SortField.Title:
        this.sortByTitle();
        break;
      case SortField.Mins:
        this.sortByMinutes();
        break;
      case SortField.Year:
        this.sortByYear();
        break;
    }
  }

  private sortByTitle(): void {
    this.titleSortOrder = this.titleSortOrder == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    this.movies = this.movies.sort((firstMovie, secondMovie) => {
      const titleA = firstMovie.title.trim().toUpperCase();
      const titleB = secondMovie.title.trim().toUpperCase();
      if (titleA < titleB) {
        return this.titleSortOrder === SortOrder.Ascending ? -1 : 1;
      }
      if (titleA > titleB) {
        return this.titleSortOrder === SortOrder.Ascending ? 1 : -1;
      }

      return 0;
    });
  }

  private sortByMinutes(): void {
    this.minsSortOrder = this.minsSortOrder == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    this.movies = this.movies.sort((firstMovie, secondMovie) =>
                  this.minsSortOrder == SortOrder.Ascending ? firstMovie.mins - secondMovie.mins : secondMovie.mins - firstMovie.mins);
  }

  private sortByYear(): void {
    this.yearSortOrder = this.yearSortOrder == SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    this.movies = this.movies.sort((firstMovie, secondMovie) => {
      const firstMovieYear = firstMovie.year;
      const secondMovieYear = secondMovie.year;
      if (firstMovieYear < secondMovieYear) {
        return this.yearSortOrder == SortOrder.Ascending ? -1 : 1;
      }
      if (firstMovieYear > secondMovieYear) {
        return this.yearSortOrder == SortOrder.Ascending ? 1 : -1;
      }
      return 0;
    });
  }

  public get sortFieldEnum(): typeof SortField {
    return SortField;
  }

  public get sortOrderEnum(): typeof SortOrder {
    return SortOrder;
  }
}
