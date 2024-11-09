import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

//* TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

//* TODO: Define a class for the Weather object
class Weather {
  date: string;
  icon: string;
  iconDescription: string;
  temp: number;
  wind: number;
  humidity: number;

  constructor(date: string, icon: string, iconDescription: string, temp: number, wind: number, humidity: number) {
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class

class WeatherService {
  //* TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  cityName?: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  //* TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
      );

      const locationData = await response.json();
      console.log(locationData);
      
      return locationData;
    }
 
    catch (err) {
      console.log('Error: Cannot fetch location data', err);
      return err;
    }
  }

  //* TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    console.log(locationData)
    const {name, lat, lon, country} = locationData;
    const coordinates = {name, lat, lon, country};
    console.log(coordinates);
    
    return coordinates
  }

  //* TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(coordinates: Coordinates): string {
    const lat = coordinates.lat;
    const lon = coordinates.lon;

    const geocodeQuery: string = `${this.baseURL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${this.apiKey}`

    return geocodeQuery
  }

  //* TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const lat = coordinates.lat;
    const lon = coordinates.lon;

    const weatherQuery: string = `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    return weatherQuery
  }

  // //  TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {
    
  // }

  //* TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const lat = coordinates.lat;
    const lon = coordinates.lon;

    const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)

    const weatherData = await response.json();
    console.log(weatherData);    

    return weatherData
  }

  //* TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const {date, icon, iconDescription, temp, wind, humidity} = JSON.parse(response)
    const currentWeather = {date, icon, iconDescription, temp, wind, humidity}
   return currentWeather
  }

  //* TODO: Complete buildForecastArray method
  private buildForecastArray(coordinates: Coordinates, weatherData: any[]) {
    const forecastArray: Weather[] = weatherData.map((forecast: Weather) => {
      const forecastObject = {
        name: coordinates.name,
        country: coordinates.country,
        date: forecast.date,
        icon: forecast.icon,
        iconDescription: forecast.iconDescription,
        temp: forecast.temp,
        wind: forecast.wind,
        humidity: forecast.humidity
      };
      return forecastObject
    });
    console.log(forecastArray);
    
    return forecastArray
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    return await this.read().then((weather) =>)
  }
}

export default new WeatherService();
