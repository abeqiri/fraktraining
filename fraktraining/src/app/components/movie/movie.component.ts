import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/services/cm-api/models/movie';
import { MovieService } from 'src/app/services/cm-api/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().then((response) => {
      this.movies = response.movies
    });
  }

}
