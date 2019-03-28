import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private apiRoot = 'https://ghquotes.herokuapp.com/';

//https://ghquotes.herokuapp.com/

  constructor(private http: HttpClient) { }


  getQuotes() {
    return this.http.get(this.apiRoot.concat('quotes/'));
  }
}
