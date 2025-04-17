import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useWeatherStore } from '../services/useWeather';

const WeatherComponent = () => {
  const { weather, loading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather(37.7749, -122.4194); // Example: San Francisco
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!weather) return <Text>No weather data available</Text>;

  return (
    <View>
      <Text>Temperature: {weather.current.temperature_2m}°</Text>
      <Text>Wind Speed: {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</Text>
    </View>
  );
};

export default WeatherComponent;
