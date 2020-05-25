import { WeatherService } from './../weather.service';
import { DaysModel } from './../shared/days.model';
import { DetailsModel } from './../shared/details.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  details: DetailsModel;
  days: DaysModel;

  city: string;
  today: string;

  stateSubscribtion: Subscription;
  tempSubscribtion: Subscription;
  humiditySubscribtion: Subscription;
  windSubscribtion: Subscription;
  forecastSubscribtion: Subscription;

  constructor(private activeRoute: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit() {
    //// getting the actual date string
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRoute.paramMap.subscribe((route: any) => {
      this.city = route.params.city;
      /// subcribing to state
      this.stateSubscribtion = this.weatherService.getWeatherState(this.city)
      .subscribe((state) => this.details.state = state);
      /// subcribing to temp
      this.tempSubscribtion = this.weatherService.getCurrentTemp(this.city)
      .subscribe((temp) => this.details.temp = temp);
      /// subscribing to hum
      this.humiditySubscribtion = this.weatherService.getCurrentHum(this.city)
      .subscribe((hum) => this.details.hum = hum);
      /// subscribing to wind
      this.windSubscribtion = this.weatherService.getCurrentWind(this.city)
      .subscribe((wind) => this.details.wind = wind);

      /// subscribing to the forecast data
      this.forecastSubscribtion = this.weatherService.getForecast(this.city)
      .subscribe((data: any) => {
        console.log(data);
        // tslint:disable-next-line:prefer-const
        for (let i of data) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          switch (date) {
            case 0:
              /// Sunday
              this.days.dayName7 = days[date];
              this.days.dayState7 = data[i].weather[0].main;
              this.days.dayTemp7 = Math.round(data[i].main.temp);
              break;
            case 1:
              /// Monday
              this.days.dayName1 = days[date];
              this.days.dayState1 = data[i].weather[0].main;
              this.days.dayTemp1 = Math.round(data[i].main.temp);
              break;
            case 2:
              /// Tuesday
              this.days.dayName2 = days[date];
              this.days.dayState2 = data[i].weather[0].main;
              this.days.dayTemp2 = Math.round(data[i].main.temp);
              break;
            case 3:
              /// Wednesday
              this.days.dayName3 = days[date];
              this.days.dayState3 = data[i].weather[0].main;
              this.days.dayTemp3 = Math.round(data[i].main.temp);
              break;
            case 4:
              /// Thursday
              this.days.dayName4 = days[date];
              this.days.dayState4 = data[i].weather[0].main;
              this.days.dayTemp4 = Math.round(data[i].main.temp);
              break;
            case 5:
              /// Friday
              this.days.dayName5 = days[date];
              this.days.dayState5 = data[i].weather[0].main;
              this.days.dayTemp5 = Math.round(data[i].main.temp);
              break;
            case 6:
              /// Saturday
              this.days.dayName6 = days[date];
              this.days.dayState6 = data[i].weather[0].main;
              this.days.dayTemp6 = Math.round(data[i].main.temp);
          }
        }
      });
    });


  }

  ngOnDestroy() {
    this.tempSubscribtion.unsubscribe();
    this.stateSubscribtion.unsubscribe();
    this.forecastSubscribtion.unsubscribe();
    this.humiditySubscribtion.unsubscribe();
    this.windSubscribtion.unsubscribe();

  }

}
