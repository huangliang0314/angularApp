import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../Entity/hero';
import {HeroService} from '../hero.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private serv:HeroService,private loca:Location,private route:ActivatedRoute) { }

  ngOnInit() {
    this.getHero();
  }


  @Input() hero:Hero;

  getHero():void{
    const id=+this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('detail1'));
    this.serv.getHero(id).subscribe(hero=>this.hero=hero);
  }
  goBack():void{
    this.loca.back();
  }

  save():void{
    this.serv.updateHero(this.hero).subscribe(()=>this.goBack());
  }
}
