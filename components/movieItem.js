import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { Card } from 'react-native-elements'
import { baseImgPth } from '../utils/constant'


class MovieItem extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View key={this.props.item.id.toString()}
                style={{
                    width: Dimensions.get('screen').width / 3,
                    margin: 8,
                    borderRadius : 8,

                }}>
                
                <Card
                    containerStyle={{
                        borderRadius: 4,
                        elevation: 8,
                        padding: 0,

                        flex: 0,
                        margin: 0,
                    }} >
                    <Image
                        style={{
                            width: "100%",
                            height: '100%',
                            flex: 0
                        }}

                        source={{ uri: baseImgPth + this.props.item.poster_path }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={
                            styles.text
                        }>
                        {this.props.item.title.toString()}
                    </Text>
                </Card>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    text: {
        width: "100%",
        color: 'white',
        position: 'absolute',
        padding: 8,
        alignSelf: 'center',
        bottom: 0,
        backgroundColor: 'grey'
    },

    image: {
        flex: 0,
        width: "100%",
        height: "100%"
    }

})

export default MovieItem;

