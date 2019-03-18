import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Loading from '../components/loading';
import { Navigation } from 'react-native-navigation';
import { goMain } from '../routes/routes';
import { primaryColor } from '../utils/constant';


class Welcome extends React.PureComponent {
    async componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                visible: false
            }
        });
        setTimeout(() => {
            goMain()
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Splash Page</Text>
                <Loading />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    }
})

export default Welcome;