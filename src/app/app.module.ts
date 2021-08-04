import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CategoriesComponent } from './categories/categories.component';
import { DetailsComponent } from './details/details.component';
import { DecimalPipe } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultsComponent } from './results/results.component';
import { UserService } from 'src/services/userService';
import { RestaurantsService } from 'src/services/restaurants.service';
import { SidebarModule } from 'ng-sidebar';
import { SupportComponent } from './support/support.component';
import { OurMenuComponent } from './our-menu/our-menu.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { SeeAllComponent } from './see-all/see-all.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    CategoriesComponent,
    DetailsComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ResultsComponent,
    SupportComponent,
    OurMenuComponent,
    ModalComponent,
    SeeAllComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    DecimalPipe,
    UserService,
    RestaurantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
