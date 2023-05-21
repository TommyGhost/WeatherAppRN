import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Location(props) {
  const getMessage = temp => {
    if (temp > 25) {
      return "It's 🍦 time";
    } else if (temp > 20) {
      return 'Time for shorts and 👕';
    } else if (temp < 10) {
      return "You'll need 🧣 and 🧤";
    } else {
      return 'Bring a 🧥 just in case';
    }
  };

  const getWeatherIcon = condition => {
    if (condition < 300) {
      return '🌩';
    } else if (condition < 400) {
      return '🌧';
    } else if (condition < 600) {
      return '☔️';
    } else if (condition < 700) {
      return '☃️';
    } else if (condition < 800) {
      return '🌫';
    } else if (condition == 800) {
      return '☀️';
    } else if (condition <= 804) {
      return '☁️';
    } else {
      return '🤷‍';
    }
  };

  const {weatherData} = props.route.params;
  const [temp, setTemp] = useState();
  const [condition, setCondition] = useState('');
  const [message, setMessage] = useState('');
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    setTemp(weatherData.main.temp.toFixed(0));
    setMessage(getMessage(temp));
    setCondition(getWeatherIcon(weatherData.weather[0].id));
    setCityName(weatherData.name);

    console.log(
      `Temperature: ${temp}, Condition: ${condition}, Message: ${message}, City Name: ${cityName}`,
    );
  }, [weatherData, temp, condition]);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={false}
        barStyle={'light-content'}
        backgroundColor={'#222'}
      />
      <ImageBackground
        style={styles.body}
        source={require('../../assets/location_background.jpg')}
        resizeMode={'stretch'}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.replace('Loading')}>
            <FontAwesome name="location-arrow" size={50} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('City')}>
            <MaterialIcons name="location-city" size={50} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.temp}>
          <Text style={[styles.text, {fontSize: 100}]}>{temp}° </Text>
          <Text style={[styles.text, {fontSize: 100}]}>{condition}</Text>
        </View>

        <View>
          <Text style={[styles.text, {fontSize: 80, textAlign: 'right'}]}>
            {message} in {cityName}!
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '15%',
  },
  temp: {
    height: '45%',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'SpartanMB-Black.otf',
    fontWeight: '900',
    color: '#ffffff',
  },
});

export default Location;
