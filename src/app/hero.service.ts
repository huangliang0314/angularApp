import { Injectable } from '@angular/core';
import { Hero } from './Entity/hero';
import { Heroes } from './Entity/mock-heroes';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/Observable/of';
@Injectable()
export class HeroService {

  constructor() { }
  getHeroes(): Observable<Hero[]> {
    return of(Heroes);
  }
}
