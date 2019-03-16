import React from 'react';
import { View, Text  ,StyleSheet} from 'react-native'
import { Navigation } from 'react-native-navigation';

class Detail extends React.PureComponent {

    async componentDidMount(){
        Navigation.mergeOptions(this.props.componentId,{
            bottomTabs:{
                visible : false
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Detail</Text>
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
export default Detail;