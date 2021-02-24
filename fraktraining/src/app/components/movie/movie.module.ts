import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TooltipDirective } from "src/app/directives/tooltip.directive";
import { MovieBackgroundPipe } from "src/app/pipes/movie-background.pipe";
import { MovieRoutingModule } from "./movie-routing.module";
import { MovieComponent } from "./movie.component";
import { MoviesComponent } from "./movies/movies.component";
import { SingleMovieComponent } from "./single-movie/single-movie.component";

@NgModule({
  declarations: [
    SingleMovieComponent,
    MovieComponent,
    MoviesComponent,
    MovieBackgroundPipe,
    TooltipDirective
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MovieRoutingModule
  ]
})
export class MovieModule {}
