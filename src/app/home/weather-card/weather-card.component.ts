import { Subscription } from 'rxjs';
import { WeatherService } from './../../weather.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  city: string;
  state: string;
  temp: number;
  minTemp: number;
  maxTemp: number;

  stateSub: Subscription;
  tempSub: Subscription;
  minTempSub: Subscription;
  maxTempSub: Subscription;


  constructor(private activeRoute: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((route: any) => {
      this.city = route.params.city;
      this.stateSub = this.weatherService.getWeatherState(this.city).subscribe(state => this.state = state);
      this.tempSub = this.weatherService.getCurrentTemp(this.city).subscribe(temp => this.temp = temp);
      this.minTempSub = this.weatherService.getMinTemp(this.city).subscribe(minTemp => this.minTemp = minTemp);
      this.maxTempSub = this.weatherService.getMaxTemp(this.city).subscribe(maxTemp => this.maxTemp = maxTemp);
    });
  }

  ngOnDestroy() {
    this.stateSub.unsubscribe();
    this.tempSub.unsubscribe();
    this.minTempSub.unsubscribe();
    this.maxTempSub.unsubscribe();
  }

}
