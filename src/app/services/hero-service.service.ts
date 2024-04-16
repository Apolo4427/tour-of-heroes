import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  getHeroes():Observable<Hero[]>{
    let heroes = of(HEROES);//no es necesario tipar la variable heroes
    return  heroes;
  }

  getHeroById(id:number):Hero | undefined {
    return  HEROES.find(hero => hero.id == id);
  }

  seachHero(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }

    const heroes = HEROES.filter(hero => hero.name.toLowerCase().includes(term.toLowerCase()));

    return of(heroes)//devolvemos la lista que coninsida con el termino de la busqueda
  }

  addHero(){

  }

  deleteHero(){
    
  }

}
