import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroServiceService } from '../services/hero-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  heroList:Hero[]=[]

  private _serviceHeroes = inject(HeroServiceService);
  private _route = inject(Router);

  getHeroes(){
    this._serviceHeroes.getHeroes().subscribe(heroes => this.heroList = heroes.slice(1,5));
  }

  ngOnInit(): void {
     this.getHeroes();
  }

  onDetail(id:number){
    this._route.navigate(['detail/',id]);
  }
}
