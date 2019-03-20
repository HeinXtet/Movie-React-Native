import React from 'react';
import { FlatList, Text, StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native';
import { baseImgPth } from '../utils/constant';

import { Avatar } from 'react-native-elements'
import { Navigation } from 'react-native-navigation';

class CastList extends React.PureComponent {


    constructor(props) {
        super(props)
    }


    _renderItem = (item) => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('screen').width / 3,
                height: "100%",
                flexDirection: 'column',
                padding: 0,
            }}>
                <Navigation.Element elementId='cast'>
                    <Avatar
                        size={100}
                        rounded
                        onPress={() =>
                            this.props.castItemClick(item)
                        }
                        source={{ uri: baseImgPth + item.profile_path }}
                    />
                </Navigation.Element>
                <Text numberOfLines={1} ellipsizeMode='clip' style={{ textAlign: 'center', marginLeft: 8, padding: 8 }}>
                    {item.name}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <FlatList
                horizontal={true}
                data={this.props.item}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return this._renderItem(item)
                }}
                keyExtractor={(item, index) => item.cast_id.toString()}
            />
        )
    }

}

const styles = StyleSheet.create({
    castItem: {
        width: "30%",
        height: "80%",
        margin: 16,
    }
})
const { height } = Dimensions.get('window').height;
const { width } = Dimensions.get('window').width;


export default CastList;