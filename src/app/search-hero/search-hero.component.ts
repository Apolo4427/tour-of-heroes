import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroServiceService } from '../services/hero-service.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-search-hero',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './search-hero.component.html',
  styleUrl: './search-hero.component.css'
})
export class SearchHeroComponent implements OnInit {

  heroList:Hero[] = [];
  heroes$!:Observable<Hero>;

  private _heroService = inject(HeroServiceService);

  ngOnInit(): void {

    // pasar todo el obserbable y crear aqui el array
      // this.heroes$.pipe(
      //   toArray()
      // ).subscribe(heroes =>this.heroList = heroes);
    
  }
}
