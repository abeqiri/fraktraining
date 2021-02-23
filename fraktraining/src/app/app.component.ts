import { Component } from '@angular/core';
import { ApiClientService } from './services/cm-api';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Movie } from './services/cm-api/models/movie';
import { MovieService } from './services/cm-api/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fraktraining';
  public movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAllMovies().then((response) => {
      this.movies = response.movies
    });
  }
}
