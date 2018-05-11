import { Injectable } from '@angular/core';
import { Hero } from './Entity/hero';
import { Heroes } from './Entity/mock-heroes';
import {MessageService} from './message.service'

/* 
        下面导入的另一种写法目前报错
        import { Observable，of } from 'rxjs';/
*/
import { Observable } from 'rxjs/Observable';/* Observable注意大小写 */
import { of } from 'rxjs/observable/of';/* Observable注意大小写 */

import {HttpClient,HttpHeaders} from '@angular/common/http';

import {catchError,map,tap} from 'rxjs/operators';


@Injectable()
export class HeroService {

  private heroUrl:string='api/Heroes';
  constructor(private mesg :MessageService,private http:HttpClient) { }
  getHeroes(): Observable<Hero[]> {
    // 
    this.log("Fetched Heroes");
    // return of(Heroes);
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );;
  }

  getHero(id:number): Observable<Hero> {
    // this.log(`Fetched Hero id=${id}`);
    const url=`${this.heroUrl}/${id}`;
    // return of(Heroes.find(hero=>hero.id===id));
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`Fetched Hero id=${id}`)),
      catchError(this.handleError<Hero>(`get Hero id=${id}`))
    );
  }

  private log(messg:string){
    this.mesg.add("HeroService: "+messg);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
