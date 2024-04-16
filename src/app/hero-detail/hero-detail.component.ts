import { Component, OnInit, inject, input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroServiceService } from '../services/hero-service.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit{

  hero?:Hero;

  private _activateRouter = inject(ActivatedRoute);
  private _heroService = inject(HeroServiceService);

  constructor (private _location:Location){}

  ngOnInit(): void {
    this._activateRouter.params.subscribe(params =>{
      this.hero = this._heroService.getHeroById(params['id']);
    })
    console.log(this.hero);
  }

  goBack(){
    this._location.back();
  }

  save(){
    this._location.back();
    alert(`Se ha guardado el nombre del heroe: ${this.hero?.id}`);
  }


}
