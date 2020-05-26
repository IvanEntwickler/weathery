import { WeatherService } from './../weather.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  dayName1: string;
  dayName2: string;
  dayName3: string;
  dayName4: string;
  dayName5: string;
  dayName6: string;
  dayName7: string;

  dayState1: string;
  dayState2: string;
  dayState3: string;
  dayState4: string;
  dayState5: string;
  dayState6: string;
  dayState7: string;

  dayTemp1: number;
  dayTemp2: number;
  dayTemp3: number;
  dayTemp4: number;
  dayTemp5: number;
  dayTemp6: number;
  dayTemp7: number;

  state: string;
  temp: number;
  hum: number;
  wind: number;
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
      .subscribe((state) => this.state = state);
      /// subcribing to temp
      this.tempSubscribtion = this.weatherService.getCurrentTemp(this.city)
      .subscribe((temp) => this.temp = temp);
      /// subscribing to hum
      this.humiditySubscribtion = this.weatherService.getCurrentHum(this.city)
      .subscribe((hum) => this.hum = hum);
      /// subscribing to wind
      this.windSubscribtion = this.weatherService.getCurrentWind(this.city)
      .subscribe((wind) => this.wind = wind);

      /// subscribing to the forecast data
      this.forecastSubscribtion = this.weatherService.getForecast(this.city)
      .subscribe((data: any) => {
        console.log(data);
        // tslint:disable-next-line:prefer-const
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          switch (date) {
            case 0:
              /// Sunday
              this.dayName7 = days[date];
              this.dayState7 = data[i].weather[0].main;
              this.dayTemp7 = Math.round(data[i].main.temp);
              break;
            case 1:
              /// Monday
              this.dayName1 = days[date];
              this.dayState1 = data[i].weather[0].main;
              this.dayTemp1 = Math.round(data[i].main.temp);
              break;
            case 2:
              /// Tuesday
              this.dayName2 = days[date];
              this.dayState2 = data[i].weather[0].main;
              this.dayTemp2 = Math.round(data[i].main.temp);
              break;
            case 3:
              /// Wednesday
              this.dayName3 = days[date];
              this.dayState3 = data[i].weather[0].main;
              this.dayTemp3 = Math.round(data[i].main.temp);
              break;
            case 4:
              /// Thursday
              this.dayName4 = days[date];
              this.dayState4 = data[i].weather[0].main;
              this.dayTemp4 = Math.round(data[i].main.temp);
              break;
            case 5:
              /// Friday
              this.dayName5 = days[date];
              this.dayState5 = data[i].weather[0].main;
              this.dayTemp5 = Math.round(data[i].main.temp);
              break;
            case 6:
              /// Saturday
              this.dayName6 = days[date];
              this.dayState6 = data[i].weather[0].main;
              this.dayTemp6 = Math.round(data[i].main.temp);
          }
        }
      });
    });


  }

  /// unsubscribe each Subscription
  ngOnDestroy() {
    this.tempSubscribtion.unsubscribe();
    this.stateSubscribtion.unsubscribe();
    this.forecastSubscribtion.unsubscribe();
    this.humiditySubscribtion.unsubscribe();
    this.windSubscribtion.unsubscribe();

  }

}
