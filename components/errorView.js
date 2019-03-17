

import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

class ErrorView extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 18
                }}>{this.props.errorMessage}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ErrorView;