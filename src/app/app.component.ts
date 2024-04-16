import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgFor, UpperCasePipe, AsyncPipe } from '@angular/common';
import { Hero } from './hero';
import { HeroServiceService } from './services/hero-service.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashboardComponent, UpperCasePipe, RouterLink, NgFor, UpperCasePipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Tour of heroes';

  heroes$!:Observable<Hero[]>;

  private searchTerm = new Subject<string>();
  private _heroService = inject(HeroServiceService);
  private _router = inject(Router);

  searchHero(term:string){
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
      this.heroes$ = this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term:string)=>this._heroService.seachHero(term))
      )
  }

  onDetail(id:number){
    this._router.navigate(['detail/',id]);
  }
}
