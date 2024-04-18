import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  wantedListHero?:Hero[];
  private restart=new BehaviorSubject<boolean>(false);

  setWantedHero(heroList:Hero[]|undefined){
    this.wantedListHero = heroList;
  }

  getWantedHero():Hero[]|undefined{
    return this.wantedListHero;
  }

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

  restartComponent(){
    this.restart.next(true);
    setTimeout(()=> this.restart.next(false));
  }

  get restarObservable(): Observable<boolean>{
    return this.restart.asObservable();
  }

  addHero(){

  }

  deleteHero(){
    
  }

}
