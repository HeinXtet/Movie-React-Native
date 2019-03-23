import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { primaryColor } from '../utils/constant';
import TopBar from '../components/topbar'
import { Navigation } from 'react-native-navigation';

class Categories extends React.PureComponent {

    constructor(props) {
        super(props)
    }
    componentDidMount(){
        Navigation.mergeOptions(this.props.componentId,{
            topBar : {
                visible :false,
                height : 0
            }
        })
    }


    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: primaryColor }}>
                    <TopBar componentId={this.props.componentId} title='Categories' />

                    <Text>Categories</Text>
                </SafeAreaView>
            </View>
        )
    }
}


export default Categories;