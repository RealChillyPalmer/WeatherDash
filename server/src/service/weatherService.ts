// import fs from 'node:fs/promises';
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
      console.log('53', locationData);

      return locationData;
    }

    catch (err) {
      console.log('Error: Cannot fetch location data', err);
      return err;
    }
  }

  //* TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    console.log('66', locationData)
    
    const { name, lat, lon, country } = locationData;
    console.log('69', locationData)
    const newLocData = { name, lat, lon, country };
    console.log('71', newLocData.name);

    return newLocData
  }
  // //* TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(coordinates: Coordinates): string {
  //   const lat = coordinates.lat;
  //   const lon = coordinates.lon;

  //   const geocodeQuery: string = `/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${this.apiKey}`

  //   return geocodeQuery
  // }

  //* TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const lat = coordinates.lat;
    const lon = coordinates.lon;

    const weatherQuery: string = `/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;

    return weatherQuery
  }

  //* TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(newLocData: Coordinates): Promise<Coordinates> {
    const locData = newLocData;
    console.log(locData)

    const locationData = this.destructureLocationData(locData)

    return locationData
  }

  //* TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates)

    const response = await fetch(`${this.baseURL}${weatherQuery}`)

    const weatherData = await response.json();
    console.log(weatherData);

    return weatherData
  }

  //* TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const { cityName, date, icon, iconDescription, temp, wind, humidity } = JSON.parse(response)
    const currentWeather = { cityName, date, icon, iconDescription, temp, wind, humidity }
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
    this.cityName = city;
    console.log(city)

    const cityData: Coordinates = await this.fetchLocationData(city);

    const coordinates: Coordinates = await this.fetchAndDestructureLocationData(cityData);

    // const geoQuery = this.buildGeocodeQuery(coordinates);

    // const weatherQuery = this.buildWeatherQuery(cityData);

    const weatherData = await this.fetchWeatherData(coordinates);

    const currentWeather = this.parseCurrentWeather(weatherData);

    const forecastArray = this.buildForecastArray(coordinates, weatherData)

    console.log(coordinates)

    return { currentWeather, forecastArray }
  }
}

export default new WeatherService();
