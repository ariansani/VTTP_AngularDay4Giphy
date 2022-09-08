import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { giphySearch } from '../models';
import { GiphyService } from '../services/giphysearch.service';

@Component({
  selector: 'app-giphysearch',
  templateUrl: './giphysearch.component.html',
  styleUrls: ['./giphysearch.component.css'],
})
export class GiphysearchComponent implements OnInit {
  giphySearch: string[] = [];
  sub$!: Subscription;
  constructor(private giphySvc: GiphyService) {}



  ngOnInit(): void {
    this.sub$ = this.giphySvc.onNewResult.subscribe((data) => {
      console.info('>>> in sub: ', data);
      this.giphySearch = data;
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
