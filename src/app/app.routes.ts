import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroComponent } from './hero/hero.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

export const routes: Routes = [
    {
        path:'', component: DashboardComponent
    },
    {
        path:'hero', component: HeroComponent
    },
    {
        path:'detail/:id', component: HeroDetailComponent
    },
    {
        path:'**', redirectTo: '', pathMatch: 'full'
    }
];
