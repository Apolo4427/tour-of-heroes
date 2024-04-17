import { Component, OnInit, inject, input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgFor, UpperCasePipe, AsyncPipe } from '@angular/common';
import { Hero } from './hero';
import { HeroServiceService } from './services/hero-service.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, of, toArray } from 'rxjs';
import { SearchHeroComponent } from './search-hero/search-hero.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashboardComponent, UpperCasePipe, RouterLink, NgFor, UpperCasePipe, AsyncPipe,
    SearchHeroComponent,FormsModule, ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Tour of heroes';

  heroes$!:Observable<Hero[]>;
  heroList?:Hero[][];
  searchForm!: FormGroup; 

  constructor(private formBuilder:FormBuilder){
    this.searchForm = this.formBuilder.group(
      {input:['']}
    )
  }

  private searchTerm = new Subject<string>();
  private _heroService = inject(HeroServiceService);
  private _router = inject(Router);

  ngOnInit(): void {
      this.heroes$ = this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term:string)=>this._heroService.seachHero(term))
      )
  }

  searchHero(){
    const term = this.searchForm.get('input')?.value;
    this.searchTerm.next(term);
  }

  onDetail(id:number){
    this.searchForm.get('input')?.setValue('');
    this._router.navigate(['detail/',id]);
  }

  onSearch(){
    const term = this.searchForm.get('input')?.value;
    this._heroService.setWantedHero(term);
    console.log(this.heroList);
    this._router.navigate(['search']);
    this.searchForm.get('input')?.setValue('');
  }

}
