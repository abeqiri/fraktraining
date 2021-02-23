import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiClientService } from './services/cm-api';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/cm-api/movie.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiClientService,
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
