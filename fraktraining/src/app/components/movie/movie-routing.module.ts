import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieComponent } from "./movie.component";
import { MoviesComponent } from "./movies/movies.component";
import { SingleMovieComponent } from "./single-movie/single-movie.component";

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    children: [
      {
        path: '',
        component: MoviesComponent,
      },
      {
        path: ':slug',
        component: SingleMovieComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
