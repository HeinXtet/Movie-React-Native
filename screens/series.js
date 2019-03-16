import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';


class Series extends React.PureComponent {
    render() {
        return (<View style={styles.container}>
            <Text>Series</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})


export default Series;