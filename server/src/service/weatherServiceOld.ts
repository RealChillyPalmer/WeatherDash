// // import fs from 'node:fs/promises';
// import dotenv from 'dotenv';
// dotenv.config();

// //* TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   name: string;
//   lat: number;
//   lon: number;
//   country: string;
//   state: string;
// }

// //* TODO: Define a class for the Weather object
// class Weather {
//   date: string;
//   icon: string;
//   iconDescription: string;
//   temp: number;
//   wind: number;
//   humidity: number;

//   constructor(date: string, icon: string, iconDescription: string, temp: number, wind: number, humidity: number) {
//     this.date = date;
//     this.icon = icon;
//     this.iconDescription = iconDescription;
//     this.temp = temp;
//     this.wind = wind;
//     this.humidity = humidity;
//   }
// }

// // TODO: Complete the WeatherService class

// class WeatherService {
//   //* TODO: Define the baseURL, API key, and city name properties
//   private baseURL?: string;
//   private apiKey?: string;
//   cityName?: string;

//   constructor() {
//     this.baseURL = process.env.API_BASE_URL || '';
//     this.apiKey = process.env.API_KEY || '';
//   }

//   //* TODO: Create fetchLocationData method
//   private async fetchLocationData(query: string) {
//     try {
//       const response = await fetch(
//         `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
//       );

//       const locationData = await response.json();
//       console.log('53', locationData);

//       return locationData;
//     }

//     catch (err) {
//       console.log('Error: Cannot fetch location data', err);
//       return err;
//     }
//   }

//   //* TODO: Create destructureLocationData method
//   private destructureLocationData(locationData: Coordinates[]): Coordinates {
//     console.log('66', locationData)
    
//     const { name, lat, lon, country, state } = locationData[0];
//     console.log('69', locationData)
//     const newLocData: Coordinates = { name, lat, lon, country, state };
//     console.log('71', newLocData);

//     return newLocData
//   }
//   // //* TODO: Create buildGeocodeQuery method
//   // private buildGeocodeQuery(coordinates: Coordinates): string {
//   //   const lat = coordinates.lat;
//   //   const lon = coordinates.lon;

//   //   const geocodeQuery: string = `/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${this.apiKey}`

//   //   return geocodeQuery
//   // }

//   //* TODO: Create buildWeatherQuery method
//   private buildWeatherQuery(coordinates: Coordinates): string {
//     const lat = coordinates.lat;
//     const lon = coordinates.lon;

//     const weatherQuery: string = `/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;

//     // console.log('93', weatherQuery)
//     return weatherQuery
//   }

//   //* TODO: Create fetchAndDestructureLocationData method
//   private async fetchAndDestructureLocationData(newLocData: Coordinates[]): Promise<Coordinates> {
    
    
    
//     const locData = newLocData;
//     // console.log("100", locData)

//     const locationData = this.destructureLocationData(locData)

//     console.log("107", locationData)
//     return locationData
//   }

//   //* TODO: Create fetchWeatherData method
//   private async fetchWeatherData(weatherQuery: string): Promise<Weather[]> {
//     const response = await fetch(`${this.baseURL}${weatherQuery}`)

//     const weatherData: Weather[]= await response.json()
    
//     console.log('117 Weather Data', weatherData)
//     return weatherData
//   }

//   //* TODO: Build parseCurrentWeather method
//   private parseCurrentWeather(response: any) {
//     const { list } = response;
//     const currentWeather = list[0]
//     console.log('Current Weather', currentWeather)
//     return currentWeather
    
//   }

//   //* TODO: Complete buildForecastArray method
//   private buildForecastArray(currentWeather: Weather, weatherData: any) {
//   const today = currentWeather;
//   console.log("today", today);
  
//   const { list } =  weatherData;
//   console.log("List 136", list);
//   const allFutureWeather = list.splice(1, 1);
//   console.log("Future", allFutureWeather);
  
//     for (let i = 8; i < allFutureWeather.length; i++) {
//       const dailyCast = allFutureWeather[i];
//       console.log("Daily's", dailyCast)
//     }

  
  

//   // weatherData.forEach(element => {
    
//   // });

//   const forecast = [today, weatherData]
  
//     return forecast
//   }
//   // TODO: Complete getWeatherForCity method
//   async getWeatherForCity(city: string) {
//     this.cityName = city;
//     console.log(city)

//     const cityData: Coordinates[] = await this.fetchLocationData(city);

//     const coordinates: Coordinates = await this.fetchAndDestructureLocationData(cityData);

//     // const geoQuery = this.buildGeocodeQuery(coordinates);

//      const weatherQuery = this.buildWeatherQuery(coordinates);

//     const weatherData = await this.fetchWeatherData(weatherQuery);

//     const currentWeather = this.parseCurrentWeather(weatherData);

//     const forecastArray = this.buildForecastArray(currentWeather, weatherData)

//     console.log(coordinates)

//     return { currentWeather, forecastArray }
//   }
// }

// export default new WeatherService();
