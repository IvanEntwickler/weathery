import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
cityNameSubject = new Subject<string>();
stateSubject = new Subject<string>();
citiesSubject = new Subject<any>();
tempSubject = new Subject<number>();
humSubject = new Subject<number>();
maxTempSubject = new Subject<number>();
minTempSubject = new Subject<number>();
forecasteSubject = new Subject<any[]>();

constructor(private http: HttpClient) { }

/// calling API for single city data and subcribe
getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`
    ).subscribe((nameData) => {
      // tslint:disable-next-line:no-string-literal
      this.cityNameSubject.next(nameData['weather']);
    }, err => {
      console.log(err);
    });
  return this.cityNameSubject;
}

/// calling API weather data for each city
getCitiesWeatherArray(cities: string[], metric: 'metric' | 'imperial' = 'metric'): Subject<any> {

  cities.forEach((city) => {
    this.citiesSubject.next(this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`));
  });
  return this.citiesSubject;
}

/// calling API to get the state of the weather and subscribe to the stateData
getWeatherState(city: string): Subject<string> {
  this.http.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0b29194dd2d8dad338f79c617e40d853`)
  .subscribe( stateData => {
  // tslint:disable-next-line:no-string-literal
  this.stateSubject.next(stateData['weather'][0].main);
  });
  return this.stateSubject;
}

/// calling API to get the current Temperature rounding it to and converting it to a number
getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`)
    .subscribe((weather: any) => {
      this.tempSubject.next(Math.round(+(weather.main.temp)));
    });
  return this.tempSubject;
}

/// calling API to get current Humidity
getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`)
    .subscribe((weather: any) => {
      this.humSubject.next(weather.main.humidity);
    });
  return this.humSubject;
}

/// calling API to get current Wind
getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`)
    .subscribe((weather: any) => {
      this.humSubject.next(Math.floor(weather.wind.speed));
    });
  return this.humSubject;
}

/// calling API to get the temp and loop through them and evaluate the maxTemp
getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
  let maxTemp: number;

  this.http.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`)
    .subscribe((weather: any) => {
      maxTemp = weather.list[0].main.temp;
      weather.list.forEach( value => {
        return maxTemp < value.main.temp ?
        maxTemp = value.main.temp
        : value.main.temp;
      });
      this.maxTempSubject.next(Math.round(maxTemp));
    });
  return this.maxTempSubject;
}

/// calling API to get the temp and loop through them and evaluate the minTemp
getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
  let minTemp: number;

  this.http.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`)
    .subscribe((weather: any) => {
      minTemp = weather.list[0].main.temp;
      weather.list.forEach( value => {
        return minTemp > value.main.temp ?
        minTemp = value.main.temp
        : value.main.temp;
      });
      this.minTempSubject.next(Math.round(minTemp));
    });
  return this.minTempSubject;
}

/// calling API to get the whole Forecast Array for the 5 upcoming days
getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<any[]> {
  this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=0b29194dd2d8dad338f79c617e40d853`)
  .subscribe((data: any) => {
    this.forecasteSubject.next(data.list);
  });
  return this.forecasteSubject;
}

}
