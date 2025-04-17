import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { useWeatherStore } from '../services/useWeather';

const WeatherComponent = () => {
  const { weather, loading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather(37.7749, -122.4194); // Example: San Francisco
    console.log(weather ? weather.current_weather.temperature : 'idiot');
  }, [weather]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!weather || !weather.current_weather) {
    return <Text>No weather data available</Text>;
  }

  return (
    <ImageBackground
      source={require('../../assets/sunset.jpg')} // Image from assets
      style={styles.background}
      resizeMode="cover" // Resize mode for the image
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Weather in San Francisco</Text>
        <Text style={styles.text}>Temperature: {weather.current_weather.temperature}°</Text>
        <Text style={styles.text}>Wind Speed: {weather.current_weather.windspeed} km/h</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay to make text more readable
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default WeatherComponent;
