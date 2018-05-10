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


@Injectable()
export class HeroService {

  constructor(private mesg :MessageService) { }
  getHeroes(): Observable<Hero[]> {
    // 
    this.mesg.add("HeroService： Fetched Heroes")
    return of(Heroes);
  }
}
