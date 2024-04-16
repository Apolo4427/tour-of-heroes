import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroServiceService } from '../services/hero-service.service';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  heroes?:Hero[];

  private _heroService = inject(HeroServiceService);
  private _route = inject(Router);

  ngOnInit(): void {
    this.getHeroes();      
  }

  getHeroes(){
    return this._heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onDetail(id:number | undefined){
    if(id){  
      this._route.navigate(['detail/',id]);
    }  
  }

}
