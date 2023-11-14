import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-weather-api',
  templateUrl: './weather-api.component.html',
  styleUrls: ['./weather-api.component.scss']
})
export class WeatherApiComponent implements OnInit {
  weatherData: any;
  searchBoxValue: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Пример вызова с заданным городом (например, Львов)
    this.checkWeather('');
  }

  checkWeather(city: string) {
    const apiKey = "f688a15ec1672001e146199cdd041be7";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`;

    this.http.get(apiUrl + `&appid=${apiKey}`).pipe(
      map((data: any) => {
        this.weatherData = data;
        console.log(this.weatherData);
      }),
      catchError((error: any) => {
        console.error('Ошибка при получении данных о погоде:', error);
        return throwError(error);
      })
    ).subscribe();
  }

  roundTemperature(temp: number): number {
    return Math.round(temp);
  }

  roundWindSpeed(speed: number): number {
    return Math.round(speed);
  }

  onSearchButtonClick() {
    this.checkWeather(this.searchBoxValue);
  }

}