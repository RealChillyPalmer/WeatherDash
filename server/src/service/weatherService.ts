import { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

//* TODO: Define an interface for the Coordinates object
interface Coordinates {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

//* TODO: Define a class for the Weather object
class Weather {
    city: string;
    date: Dayjs | string;
    tempF: number;
    windSpeed: number;
    humidity: number;
    icon: string;
    iconDescription: string;
    constructor(
        city: string,
        date: Dayjs | string,
        tempF: number,
        windSpeed: number,
        humidity: number,
        icon: string,
        iconDescription: string
    ) {
        this.city = city;
        this.date = date;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.icon = icon;
        this.iconDescription = iconDescription;
    }
}

//* TODO: Complete the WeatherService class
class WeatherService {

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
            console.log('64', locationData);

            return locationData;
        }

        catch (err) {
            console.log('Error: Cannot fetch location data', err);
            return err;
        }
    }
    //* TODO: Create destructureLocationData method
    private destructureLocationData(locationData: Coordinates[]): Coordinates {
        const { name, lat, lon, country, state } = locationData[0];
        const newLocData: Coordinates = { name, lat, lon, country, state };

        return newLocData;
    }
    //* TODO: Create buildGeocodeQuery method
    // private buildGeocodeQuery(): string {}
    //* TODO: Create buildWeatherQuery method
    private buildWeatherQuery(coordinates: Coordinates): string {
        const lat = coordinates.lat;
        const lon = coordinates.lon;

        const weatherQuery: string = `/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;

        return weatherQuery
    }
    //* TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData() {
        const city: string = `${this.cityName}`

        const locationData = this.destructureLocationData(await this.fetchLocationData(city))

        return locationData
    }
    //* TODO: Create fetchWeatherData method
    private async fetchWeatherData(coordinates: Coordinates) {
    try{
        const query = this.buildWeatherQuery(coordinates);
        // console.log('query 103-----------', query)
        // console.log(this.baseURL)

        const response = await fetch(`${this.baseURL}${query}`)

        const weatherData = await response.json()
        
        // console.log('Weather Data 111 wServ', weatherData)
        
        return weatherData
    }

    catch (err) {
        console.log('Error: Cannot fetch weather data', err);
            return err;
        }
    }
    //* TODO: Build parseCurrentWeather method
    private parseCurrentWeather(weatherData: any) {
        const { city, list } = (weatherData);
        const info = city
        const currWeath = list[0]
        console.log('124 list wServ', info, currWeath);
        
        const currentWeather = [info, currWeath];
        console.log('Current Weather', currentWeather)
        
        return (currentWeather)
    }

    //* TODO: Complete buildForecastArray method
    private buildForecastArray(currentWeather: any, weatherData: any) {
        const { list } = (weatherData);
        // console.log("list obj*************", list)
        const mappedCast = list.filter(function(_forecast: Weather, index: number, _array: any) {
            return index % 8 == 0;
        });

        // console.log("looped Cast ********", mappedCast)
        
        const forecast = [currentWeather, mappedCast]

        return forecast
    }


    //* TODO: Complete getWeatherForCity method
    async getWeatherForCity(city: string) {
        this.cityName = city;
        // console.log('136------------', city);

        // const locationData = await this.fetchLocationData(city);

        // const destruct = this.destructureLocationData(locationData);

        const realLocationData: Coordinates = await this.fetchAndDestructureLocationData()        
        console.log("locationData", realLocationData);

        const realWeatherData = await this.fetchWeatherData(realLocationData);
        console.log("weatherData", realWeatherData)

        const currentWeather = this.parseCurrentWeather(realWeatherData)
        console.log("current", currentWeather)

        const forecastArray = this.buildForecastArray(currentWeather, realWeatherData)
        console.log("forecast", forecastArray)

        return { currentWeather, forecastArray }
    }
}

export default new WeatherService();
