import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


const styles = StyleSheet.create({
    container : {
        flexDirection : 'column',
        flex : 1, 
        justifyContent : 'center',
        alignItems : 'center'
    },
    loadingText :{
        textAlign :  'center',
        marginTop : 20,
        fontSize : 18,
    }
})

class Loading extends React.PureComponent {
    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red" />
                <Text style = {styles.loadingText}>Loading</Text>
            </View>
        )
    }
}

export default Loading;