import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Spinner from 'react-native-spinkit';
import constants from '../constants';
import config from '../../config';
const apiUrl = constants.api_url;
const apiKey = config.apiKey;

function Loading(props) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState([]);

  const options = {
    main: {
      temp: 0,
    },
    weather: [
      {
        id: 200,
      },
    ],
    name: '',
  };

  console.log(options.main.temp);
  useEffect(() => {
    async function getApi() {
      getAuth();
      getCurrentPosition();

      await fetch(
        `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
      )
        .then(res => res.json())
        .then(result => {
          const data = result;
          setWeatherData(data);
          console.log(data, 'data');
        })
        .catch(err => {
          console.log(err, 'error');
          props.navigation.navigate('Location', {
            weatherData: options,
          });
          Alert.alert(
            'Unable to get weather',
            'Please connect your phone to the internet and try again',
            [
              {
                text: 'Try Again',
                style: 'destructive',
                onPress: () => props.navigation.replace('Loading'),
              },
            ],
          );
        });
    }
    getApi();
  }, [longitude, latitude, weatherData]);

  useEffect(() => {
    if (weatherData.cod === 200) {
      props.navigation.replace('Location', {
        weatherData: weatherData,
      });
    } 
  }, [weatherData]);

  const getAuth = () => {
    Geolocation.requestAuthorization();
  };

  const getCurrentPosition = async () => {
    try {
      Geolocation.getCurrentPosition(
        pos => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
        },
        error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        {enableHighAccuracy: true},
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Spinner type={'Bounce'} size={100} color={'#fff'} isVisible></Spinner>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
  },
  text: {
    fontFamily: 'RobotoMono-Regular.ttf',
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Loading;
