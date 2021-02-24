import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/services/cm-api/models/movie';
import { MovieService } from 'src/app/services/cm-api/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {
  selectedMovieSlug: string = '';
  selectedMovie: Movie;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.selectedMovieSlug = value.get('slug');
      this.selectedMovie = this.movieService.getMovieBySlug(this.selectedMovieSlug);

      if (!this.selectedMovie) {
        this.movieService.getAllMovies().then(() => {
          this.selectedMovie = this.movieService.getMovieBySlug(this.selectedMovieSlug);
        });
      }
      document.documentElement.scrollTop = 0;
    })
  }

  get allMoviesExceptSelected(): Movie[] {
    return this.movieService.getAllMoviesExcept(this.selectedMovieSlug);
  }
}
