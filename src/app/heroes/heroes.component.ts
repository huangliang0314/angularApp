import { Component, OnInit } from '@angular/core';
import { Hero } from '../Entity/hero';
// import {Heroes} from '../Entity/mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: "winstorm",
  };
  heroes: Hero[];
  constructor(private service: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() :void{
     this.service.getHeroes().subscribe(heroesSour=>this.heroes=heroesSour);
  }

  add(heroName:string):void{
    heroName=heroName.trim();
    if(!heroName){
      return ;
    }
    
    this.service.addHero({name:heroName} as Hero).subscribe(hero=>this.heroes.push(hero));
  }

  delete(hero:Hero):void{
    this.service.deleteHero(hero).subscribe();
    this.heroes=this.heroes.filter(h=>h!==hero);
  }
  // selectedHero: Hero;
  // onSelect(hero) {
  //   this.selectedHero = hero;
  // }
}
