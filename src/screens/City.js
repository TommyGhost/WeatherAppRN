import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import constants from '../constants';
import config from '../../config';
const apiUrl = constants.api_url;
const apiKey = config.apiKey;

function City(props) {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const locationHandler = async () => {
    Keyboard.dismiss();
    setLoading(true);
    if (city !== '') {
      await fetch(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setLoading(false);
          const data = result;
          console.log(data, 'data');
          if (data?.cod === 200) {
            props.navigation.navigate('Location', {
              weatherData: data,
            });
          } else if (data?.message === 'city not found') {
            Alert.alert(
              'City not found',
              'Please remove accents or enter a valid city',
              [
                {
                  text: 'Try Again',
                  style: 'default',
                  onPress: () => null,
                },
              ],
            );
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err, 'error');
        });
    } else {
      setLoading(false);
      Alert.alert('No City Entered', 'Please enter a city of your choice', [
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => null,
        },
      ]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={false}
        barStyle={'light-content'}
        backgroundColor={'#222'}
      />
      <ImageBackground
        style={styles.body}
        source={require('../../assets/city_background.jpg')}
        resizeMode={'stretch'}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={50} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.input}>
          <View style={{justifyContent: 'center'}}>
            <MaterialIcons name="location-city" size={20} color="white" />
          </View>

          <View style={styles.textinput}>
            <TextInput
              style={styles.text}
              onChangeText={text => setCity(text)}
              placeholder={'Enter city name'}
              placeholderTextColor={'#555'}
            />
          </View>
        </View>

        <TouchableOpacity onPress={locationHandler}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {loading ? (
              <View style={{margin: 20}}>
                <ActivityIndicator color={'white'} size={'small'} />
              </View>
            ) : (
              <Text style={styles.bigText}>Get Weather</Text>
            )}
          </View>
        </TouchableOpacity>
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
    marginBottom: 25,
  },
  input: {
    flexDirection: 'row',
  },
  textinput: {
    marginLeft: 20,
    backgroundColor: '#ffffff',
    width: '85%',
    borderRadius: 10,
    height: 55,
    padding: 5,
  },
  text: {
    fontFamily: 'SpartanMB-Black.otf',
    fontSize: 20,
    color: '#000',
  },
  bigText: {
    margin: 20,
    fontFamily: 'SpartanMB-Black.otf',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
});

export default City;
