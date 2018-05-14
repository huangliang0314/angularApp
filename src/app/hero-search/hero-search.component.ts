import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../Entity/hero';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import {debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  constructor(private serv: HeroService) { 
  
  }
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.serv.searchHero(term)),
    );
  }
  search(term: string): void {
    console.log(term);
    this.searchTerms.next(term);
  }
}
