import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  cityName = 'Berlin';
  condition = 'Sunny';
  currentTemp = 20;
  minTemp = 13;
  maxTemp = 28;


  constructor() { }

  ngOnInit(): void {
  }

}
