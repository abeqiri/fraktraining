import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContentfulClientApi, createClient, Entry, EntryCollection } from 'contentful';
import { environment } from 'src/environments/environment';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private contentfulClient: ContentfulClientApi;

  constructor(protected http: HttpClient) {
      this.contentfulClient = createClient({
        space:  environment.contentful.CONTENTFUL_SPACE_ID,
        accessToken: environment.contentful.CONTENTFUL_ACCESS_TOKEN
      });
  }

  getMovies(query?: object): Promise<EntryCollection<Movie>> {
    const response =  this.contentfulClient.getEntries<Movie>(Object.assign({
    }, query));

    return response;
  }
}
