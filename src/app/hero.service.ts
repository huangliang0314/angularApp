import { Injectable } from '@angular/core';
import { Hero } from './Entity/hero';
import { Heroes } from './Entity/mock-heroes';
import { MessageService } from './message.service'

/* 
        下面导入的另一种写法目前报错
        import { Observable，of } from 'rxjs';/
*/
import { Observable } from 'rxjs/Observable';/* Observable注意大小写 */
import { of } from 'rxjs/observable/of';/* Observable注意大小写 */

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  private heroUrl: string = 'api/heroes';
  constructor(private mesg: MessageService, private http: HttpClient) { }
  getHeroes(): Observable<Hero[]> {
    // 
    this.log("Fetched Heroes");
    // return of(Heroes);
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );;
  }

  getHero(id: number): Observable<Hero> {
    // this.log(`Fetched Hero id=${id}`);
    const url = `${this.heroUrl}/${id}`;
    // return of(Heroes.find(hero=>hero.id===id));
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched Hero id=${id}`)),
      catchError(this.handleError<Hero>(`get Hero id=${id}`))
    );
  }

  private log(messg: string) {
    this.mesg.add("HeroService: " + messg);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  

  updateHero(hero:Hero):Observable<any>{
     return this.http.put(this.heroUrl,hero,httpOptions).pipe(
       tap(_ => this.log(`updated hero id=${hero.id}`)),
       catchError(this.handleError<any>('updateHero'))
     );
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post(this.heroUrl,hero,httpOptions).pipe(
      tap((hero:Hero)=> this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(hero:Hero|number):Observable<Hero>{
    const id=typeof hero==="number"?hero:hero.id;
    const url=`${this.heroUrl}/${id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
    );

  }

  searchHero(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
