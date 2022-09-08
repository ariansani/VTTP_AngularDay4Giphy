import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Subject, tap } from 'rxjs';
import { giphySearch } from '../models';

@Injectable()
export class GiphyService {
  onNewResult = new Subject<string[]>();

  constructor(private http: HttpClient) {}

  getGiphy(giphySearch: giphySearch): Promise<string[]> {
    const params = new HttpParams()
      .set('apiKey', giphySearch.apiKey)
      .set('q', giphySearch.searchTerm)
      .set('limit', giphySearch.results)
      .set('rating', giphySearch.rating);
    console.info('this is getGiphy');

    return firstValueFrom(
      this.http
        .get<any>('https://api.giphy.com/v1/gifs/search', { params })
        .pipe(
          map((result) => {
            const data = result.data;
            return data.map((v: any) => v.images.downsized_still.url as string);
          })
        )
    );

    // .then((data) => {
    //   this.onNewData.next(data);
    //   return data;
    // });
  }
}
