import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Loading from '../components/loading';
import { Navigation } from 'react-native-navigation';
import { goMain } from '../routes/routes';
import { primaryColor } from '../utils/constant';


class Welcome extends React.PureComponent {
    async componentDidMount() {

        setTimeout(() => {
            goMain()
        }, 1000);
    }

    render() {
        Navigation.setDefaultOptions({
            topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
            },
            bottomTabs: {
                drawBehind: false,
                backgroundColor: primaryColor
            }
        })
        return (
           
            < View style = { styles.container } >
                <Text style={{
                    textAlign: 'center',
                    color: "white",
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>Mov</Text>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default Welcome;