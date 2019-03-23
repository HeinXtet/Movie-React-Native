/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
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

 async _handleRoute(name) {
    Navigation.mergeOptions("sideDrawer",{
        sideMenu : {
          left : {
            visible : false
            
          }
        }
    })
    switch (name) {
      case "Categories":
      
        Navigation.setStackRoot("Tabs", {

          component: {
            name: "Categories",
            options: {
              topBar: {
                visible : false,
                drawBehind : true,
              },
              
            }
          }
        })
       
        break;
      case "Home":
        Navigation.setStackRoot("Tabs", {
          component: {
            name: "home",
            options: {
              topBar: {
                visible : false,
                drawBehind : true
              }
            }
          }
        })
      default:
        break;
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.container}>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            {this._sidebarList.map((item, index) => {
              return (
                <View style={{}}>
                  <TouchableOpacity onPress={() => this._handleRoute(item.name)} >
                    <Text style={{ padding: 8, }}>{item.name}</Text>
                    <View style={{ height: 1, backgroundColor: '#eee' }} />
                  </TouchableOpacity>
                </View>

              )
            })}
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