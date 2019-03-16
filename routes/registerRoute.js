import { Navigation } from 'react-native-navigation';
import Welcome from '../screens/welcome';
import Home from '../screens/home';
import React from 'react';
import Series from '../screens/series';
import Search from '../screens/search';
import App from '../App';
import Detail from '../screens/detail';
import configureStore from '../store/store';
import { Provider } from 'react-redux';



export const register = () => {
    let store = configureStore()
    Navigation.registerComponent('welcome', () => Welcome)
    // Navigation.registerComponentWithRedux('home', () => Home, configureStore , Provider)
    Navigation.registerComponent('series', () => Series)
    Navigation.registerComponent('app', () => App)
    Navigation.registerComponent('detail', () => Detail)
    Navigation.registerComponent('home', () => (props) => (
        <Provider store={store}>
          <Home {...props} />
        </Provider>
      ), () => Home);

      Navigation.registerComponent('search', () => (props) => (
        <Provider store={store}>
          <Search {...props} />
        </Provider>
      ), () => Search);

}