import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ImageBackground, Image, SafeAreaView } from 'react-native';
import { useWeatherStore } from '../services/useWeather';

const WeatherComponent = () => {
  const { weather, loading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather(37.7749, -122.4194); // Example: San Francisco
  }, [weather]);
  

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  // if (error) return <Text>Error: {error}</Text>;
  if (!weather || !weather.current_weather) {
    return <Text>No weather data available</Text>;
  }

  return (
    <ImageBackground source={require('../../assets/sunset5.png')} style={{ height: '100%', width: '100%'}}>
      
      <View style={styles.background}>
        <View style={styles.row}>
        <Text style={styles.text}>{Math.round(weather.current_weather.temperature)}°</Text>
        <Text style={styles.text2}> C,</Text>
        <Text style={styles.text3}>London</Text>
        </View>
        <View style={[styles.row, { marginTop: 100 }, {height: 60, width: 90}]}>
          <Image source={require('../../assets/temp.png')} style={{ height: 20, width: 20}}/>
          <Text style = {styles.lightText}>Real feel :</Text>
          <Text style={styles.smallText}>{weather.current_weather.temperature}°</Text>
        </View>
        <View style={[styles.row, { marginTop: 138 }, {height: 60, width: 90}]}>
          <Image source={require('../../assets/wind2.png')} style={{ height: 20, width: 20}}/>
          <Text style = {styles.lightText}>Wind :</Text>
          <Text style={styles.smallText}>{weather.current_weather.windspeed} mps</Text>
        </View>
        <View style={[styles.row, { marginTop: 175 }, {height: 60, width: 90}]}>
          <Image source={require('../../assets/uv.png')} style={{ height: 20, width: 20}}/>
          <Text style = {styles.lightText}>UV :</Text>
          <Text style={styles.smallText}>{7}</Text>
        </View>
        {/* <Text style={styles.text}>{weather.current_weather.temperature}°C</Text> */}
          {/* <Text style={styles.text}>{weather.current_weather.windspeed}m/s</Text> */}
<Text style = {styles.heading}>Hourly Forecast</Text>
          <View style  = {styles.container}>
            
          <Image source={require('../../assets/forecast_black.png')} style={{ height: 25, width: 25}}/>
          </View>
          {/* <Image source={require('../../assets/forecast.png')} style={{ height: 20, width: 20}}/> */}

        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    top : 0,
    left: 20,
    position: 'absolute',
    // backgroundColor: 'red'

    // padding: 20,
  },
  background: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay to make text more readable
    padding: 20,

    borderRadius: 10,
  },
  text2: {
    marginTop: 25,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 70,
    marginBottom: 10,
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  text3 :{
    color: 'white',
    fontSize: 40,
    marginBottom: 10,
    letterSpacing: -1,
    fontWeight: 'normal',
    marginLeft: 10,
    marginTop: 25,
  },
  smallText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    letterSpacing: -1,
    fontWeight: 'normal',
    marginLeft: 10,
    marginTop: 10,
  },
  lightText : {
    color: 'rgba(255, 255, 255, 0.8)', // 70% opaque white

    fontSize: 17,
    marginBottom: 10,
    letterSpacing: -1,
    fontWeight: 'thin',
    marginLeft: 10,
    marginTop: 10,
  }
  ,heading :{
    color: 'white',
    fontSize: 20,
    letterSpacing: 0,
    fontWeight: 'heavy',
    position: 'absolute',
    left: 20,
    bottom : 500
  },
  container : {
    position: 'absolute',
    left: 180,
    bottom : 490,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    padding: 10,
    backgroundColor : 'rgba(249, 217, 115, 1)'
  }
});

export default WeatherComponent;
