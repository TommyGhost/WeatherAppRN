import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Loading from './screens/Loading';
import Location from './screens/Location';
import City from './screens/City';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="City" component={City} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
