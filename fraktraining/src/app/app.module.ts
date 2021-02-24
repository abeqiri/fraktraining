import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiClientService } from './services/cm-api';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './components/movie/movie.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { MovieBackgroundPipe } from './pipes/movie-background.pipe';
import { MovieModule } from './components/movie/movie.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MovieModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiClientService,
    MovieBackgroundPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
