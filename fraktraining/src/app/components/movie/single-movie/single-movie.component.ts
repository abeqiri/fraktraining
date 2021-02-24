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
  selectedMovieSlug: string | null = '';
  selectedMovie: Movie | null;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.selectedMovie = null;
  }

  ngOnInit(): void {
    this.selectedMovieSlug = this.route.snapshot.paramMap.get('slug');

    if (this.movieService.fetchedMovies.length === 0) {
      this.movieService.getAllMovies().then(() => {
        this.selectedMovie = this.movieService.fetchedMovies.find(x => x.slug === this.selectedMovieSlug);
      });
    } else {
      this.selectedMovie = this.movieService.fetchedMovies.find(x => x.slug === this.selectedMovieSlug);
    }
  }

  get allMoviesExceptSelected(): Movie[] {
    return this.movieService.fetchedMovies.filter(x => x.slug !== this.selectedMovieSlug);
  }

  selectArticle(movie: Movie) {
    this.selectedMovie = movie;
    this.selectedMovieSlug = movie.slug;
  }
}
