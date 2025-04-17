import { create } from 'zustand';
import { WeatherData } from '../model/weatherModel';
import axios from 'axios';
import mockWeatherData from './mockData';

interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  error: null,

  fetchWeather: async (latitude, longitude) => {
    console.log('Fetching weather data...');
    set({ loading: true, error: null });

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
      console.log(`URL: ${url}`);

      const response = await axios.get(url);

      const data: WeatherData = response.data;

      // Check if current_weather exists in response
      if (!data.current_weather) {
        console.warn('No current_weather data in response, using mockWeatherData');
        set({ weather: mockWeatherData, loading: false });
        return;
      }

      console.log('API response:', JSON.stringify(data, null, 2));

      set({ weather: data, loading: false });
    } catch (error: any) {
      console.error('Axios error, using mock data:', error.message);
      set({
        weather: mockWeatherData,
        error: 'Using mock data due to error: ' + (error.message || 'Unknown error'),
        loading: false,
      });
    }
  },
}));
