import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';
import { CurrencyQuote } from './quotes.interface';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      Cotações do dolar
    </h1>
  </div>
  <ul>
    <li *ngFor="let item of items">
      <h2>{{ item.dolar }}</h2>
    </li>
  </ul>
  {{ error?.message }}
  `
})
export class AppComponent implements OnInit {

  items: CurrencyQuote[];
  error: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getQuotes().subscribe(
      (items: CurrencyQuote[]) => this.items = items,
      (error: any) => this.error = error
    );
  }
}

