import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default App = () => {
  const [city, setCity] = useState ('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '59acd3c1d43c4527b7e231739241902';
  
  const getWeather = async () => {
    try{
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
      const data = await res.json();
      setWeatherData(data);
    } catch (err){
      setError('Error finding weather data');
    }
  };

  useEffect(() => {
    city ? getWeather : setWeatherData(null);
  }, [city]);

  const getBackgroundColor = () => {
    if (weatherData && weatherData.current) {
      const condition = weatherData.current.condition.text.toLowerCase();
      switch (condition) {
        case "sunny":
          return "#ffcc00"; 

        case "clear":
          return "#99ddff";

        case "partly cloudy":
          return "#d9d9d9";

        case "cloudy":
        return "#b3b3b3";

        case "stormy":
          return "#333399";

        case "snowy":
          return "#f1dae6";

        default:
          return "#66b4cc";
      }
    } else {
      return "#66b4cc";
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Weather app!</Text>
      <View style={styles.container2}>
      <TextInput
      style={styles.textInput}
      placeholder='Enter city name'
      value={city}
      onChangeText={(text) => setCity(text)}
      />
      </View>
      <View style={styles.container3}>
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.textButton}>Get Weather</Text>
      </TouchableOpacity>
      </View>
      {error && <Text>{error}</Text>}
      {weatherData && (
        <View style={[styles.container4, { backgroundColor: getBackgroundColor() }]}>
          <Text style={styles.textSalida}>City:{weatherData.location.name}</Text>
          <Text style={styles.textSalida}>Country:{weatherData.location.country}</Text>
          <Text style={styles.textSalida}>Temperature:{weatherData.current.temp_c}</Text>
          <Text style={styles.textSalida}>Condition:{weatherData.current.condition.text}</Text>
        </View>
      )}
    </View>
  );
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5C0D0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    alignItems: 'center',
    padding: 10
  },
  container3: {
    alignItems: 'center',
    padding: 10
  },
  container4:{
    alignItems: 'center',
    backgroundColor: '#FEECE2',
    padding: 10
  },
  title: {
    textAlign: 'center',
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#F5E8DD',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#F5E8DD',
    width: 180,
    height: 50,
    padding: 5,
  },
  button: {
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#F5E8DD',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 40
  },
  textSalida:{
    textAlign: 'center',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
});