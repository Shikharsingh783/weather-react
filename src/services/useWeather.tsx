import { create } from 'zustand';
import { WeatherData } from '../model/weatherModel';

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
    set({ loading: false, error: null });

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      console.log(response);
      const data: WeatherData = await response.json();
      
    //   console.log('API response:', JSON.stringify(data, null, 2));
      console.log('Weather data:', data);
//       console.log('Temperature:', data.current.temperature);
// console.log('Units:', data.current_weather_units?.temperature);

      set({ weather: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'An error occurred', loading: false });
    }
  },
}));
