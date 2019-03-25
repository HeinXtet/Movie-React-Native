/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, BackHandler, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { primaryColor, primaryDarkColor } from "../utils/constant"
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import { goMain, goCategory, openDrawer } from '../routes/routes'
import { Navigation } from 'react-native-navigation';

class SideBar extends Component {

  _sidebarList = [
    {
      name: "Home",
    },
    {
      name: "Categories"
    },
    {
      name: "Settings"
    }
  ]

  componentDidMount() {

  }

  _handleRoute(name) {

    switch (name) {
      case "Categories":
        if (global.screenId !== 'category') {
          global.screenId = 'category'
          try {
            goCategory()
          } catch (eee) {

          }
        }
        break;
      case "Home":
        if (global.screenId !== 'home') {
          global.screenId = 'home'
          try {
            goMain()
          } catch (eee) {

          }
        }
      default:
        break;
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: primaryColor }}>
          <View style={{
            backgroundColor: 'white',
            flexDirection: 'column'
          }}>
            <View style={styles.container} />
            <View style={{
              height: '100%',
              flexDirection: 'column'
            }}>
              {this._sidebarList.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => this._handleRoute(item.name)} >
                    <Text style={{ padding: 16, }}>{item.name}</Text>
                    <View style={{ height: 1, backgroundColor: '#eee' }} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: primaryColor,
  },

  container: {
    aspectRatio: 2,
    backgroundColor: primaryColor
  }

});

export default SideBar;