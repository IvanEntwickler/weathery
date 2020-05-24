import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WeatherCardComponent } from './home/weather-card/weather-card.component';
import { AddCityCardComponent } from './home/add-city-card/add-city-card.component';
import { DetailsComponent } from './details/details.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherCardComponent,
    AddCityCardComponent,
    DetailsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
