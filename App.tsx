import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './src/store';
import ProductsListScreen from './src/screens/ProductsListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

export type MainStackParamList = {
  ProductsList: undefined;
  ProductDetails: {productId: number};
};

const Stack = createStackNavigator<MainStackParamList>();

function MainStack(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="ProductsList">
      <Stack.Screen name="ProductsList" component={ProductsListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
