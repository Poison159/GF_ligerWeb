import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { DetailsComponent } from './details/details.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { OurMenuComponent } from './our-menu/our-menu.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ResultsComponent } from './results/results.component';
import { SeeAllComponent } from './see-all/see-all.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'details', component: DetailsComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'support', component: SupportComponent},
  {path: 'our-menu', component: OurMenuComponent},
  {path: 'see-all', component: SeeAllComponent},
  {path: '', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
