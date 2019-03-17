/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { primaryColor, primaryDarkColor } from "./utils/constant"
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class SideBar extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>

        </View>

      </SafeAreaView>
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
    aspectRatio : 2,
    backgroundColor: primaryColor
  }

});
