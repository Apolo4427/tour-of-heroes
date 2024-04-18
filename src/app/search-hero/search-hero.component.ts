import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroServiceService } from '../services/hero-service.service';
import { Subscription } from 'rxjs';
import { AsyncPipe, Location, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-hero',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule],
  templateUrl: './search-hero.component.html',
  styleUrl: './search-hero.component.css'
})
export class SearchHeroComponent implements OnInit {

  heroList?:Hero[];
  restart? : Subscription;

  private _heroService = inject(HeroServiceService);
  constructor(private _location : Location){}

  ngOnInit(): void {
    this.heroList=this._heroService.getWantedHero();
    this._heroService.restarObservable.subscribe(reiniciar => {
      if (reiniciar){
        this.reiniciarComponente();
      }
    });
    
  }

  goBack(){
    this._location.back()
  }

  reiniciarComponente(): void {
    this.heroList=this._heroService.getWantedHero();
  }
}
