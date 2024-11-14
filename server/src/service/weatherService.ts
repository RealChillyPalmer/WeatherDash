import { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

// TODO: Define a class for the Weather object
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

// TODO: Complete the WeatherService class
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
            console.log('53', locationData);

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
    // TODO: Create buildGeocodeQuery method
    // private buildGeocodeQuery(): string {}
    // TODO: Create buildWeatherQuery method
    private buildWeatherQuery(coordinates: Coordinates): string {
        const lat = coordinates.lat;
        const lon = coordinates.lon;

        const weatherQuery: string = `/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;

        return weatherQuery
    }
    //* TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData() {
        const locationData = this.destructureLocationData(await this.fetchLocationData(`${this.cityName}`))

        return locationData
    }
    //* TODO: Create fetchWeatherData method
    private async fetchWeatherData(coordinates: Coordinates) {
        const query = this.buildWeatherQuery(coordinates);

        const response = await fetch(`${this.baseURL}${query}`)

        const weatherData: Weather[] = await response.json()

        return weatherData
    }
    //* TODO: Build parseCurrentWeather method
    private parseCurrentWeather(response: any) {
        const { list } = response;
        const currentWeather = list[0]
        console.log('Current Weather', currentWeather)
        return currentWeather
    }

    // TODO: Complete buildForecastArray method
    private buildForecastArray(currentWeather: Weather, weatherData: Weather[]) {
        const forecast = [currentWeather, weatherData]

        return forecast
    }


    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city: string) {
        this.cityName = city;

        const locationData = await this.fetchAndDestructureLocationData()
        console.log("locationData", locationData);

        const weatherData = await this.fetchWeatherData(locationData);
        console.log("weatherData", weatherData)

        const current = await this.parseCurrentWeather(weatherData)
        console.log("current", current)

        const forecast = this.buildForecastArray(current, weatherData)
        console.log("forecast", forecast)

        return forecast
    }
}

export default new WeatherService();
