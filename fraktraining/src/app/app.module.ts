import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiClientService } from './services/cm-api';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './components/movie/movie.component';
import { SingleMovieComponent } from './components/movie/single-movie/single-movie.component';
import { MoviesComponent } from './components/movie/movies/movies.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { MovieBackgroundPipe } from './pipes/movie-background.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    SingleMovieComponent,
    MovieComponent,
    MoviesComponent,
    TooltipDirective,
    MovieBackgroundPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
