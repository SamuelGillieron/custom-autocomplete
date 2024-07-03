import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {Cocktail} from '../models/cocktail';
import {alphabetical, sort} from 'radash';

@Injectable({
  providedIn: 'root'
})
export class CocktailServiceService {

  private baseApiUrl : string = 'https://www.thecocktaildb.com/api/json/v1/1/'
  private searchLimit = 10;

  constructor(private httpClient : HttpClient) {

  }

  searchCocktail(partialName : string) : Observable<Cocktail[]>{
    // TODO: Error handling

    const options =
      { params: new HttpParams().set('s', partialName) } ;

    return this.httpClient.get(this.baseApiUrl + "search.php", options)
      .pipe(
        tap(json => console.log(json)),
        map((response : any) => {
          return alphabetical(response.drinks, (d: Cocktail) => d.strDrink).slice(0,this.searchLimit)
        })

      )
  }

}
