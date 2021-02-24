import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SortField } from 'src/app/core/enums/sort-field.enum';
import { SortOrder } from 'src/app/core/enums/sort-order.enum';
import { Movie } from 'src/app/services/cm-api/models/movie';
import { MovieService } from 'src/app/services/cm-api/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  public sortOrder: SortOrder = SortOrder.Ascending;
  public sortField: SortField = SortField.Title;
  searchField: FormControl = new FormControl();
  subscription: Subscription;
  public movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().then((response) => {
      this.movies = response.movies.sort((a, b) => a.title.localeCompare(b.title));
    });

    this.subscription = this.searchField.valueChanges
        .subscribe((searchTerm: string) => {
          this.movies = this.movieService.searchMovies(searchTerm)
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public sort(sortField: SortField) {
    this.sortOrder = this.sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    this.movies = this.movieService.sort(sortField, this.sortOrder);
  }

  public get sortFieldEnum(): typeof SortField {
    return SortField;
  }

  public get sortOrderEnum(): typeof SortOrder {
    return SortOrder;
  }
}
