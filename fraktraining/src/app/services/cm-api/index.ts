import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContentfulClientApi, createClient, Entry, EntryCollection } from 'contentful';
import { environment } from 'src/environments/environment';
import { Movie } from './models/movie';

@Injectable()
export class ApiClientService {
  private CONTENTFUL_SPACE_ID: string;
  private CONTENTFUL_ACCESS_TOKEN: string;
  private contentfulClient: ContentfulClientApi;

  constructor(protected http: HttpClient) {
      this.CONTENTFUL_SPACE_ID = environment.contentful.CONTENTFUL_SPACE_ID;
      this.CONTENTFUL_ACCESS_TOKEN = environment.contentful.CONTENTFUL_ACCESS_TOKEN;

      this.contentfulClient = createClient({
        space: this.CONTENTFUL_SPACE_ID,
        accessToken: this.CONTENTFUL_ACCESS_TOKEN
      });
  }

  getMovies(query?: object): Promise<EntryCollection<Movie>> {
    const response =  this.contentfulClient.getEntries<Movie>(Object.assign({
    }, query));

    return response;
  }
}
