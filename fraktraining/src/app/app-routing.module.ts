import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { SingleMovieComponent } from './components/movie/single-movie/single-movie.component';

const routes: Routes = [
  {
    component: MovieComponent,
    path: ''
  },
  {
    component: SingleMovieComponent,
    path: ':slug'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
