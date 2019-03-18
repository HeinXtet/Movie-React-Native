import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { Card } from 'react-native-elements'
import { baseImgPth } from '../utils/constant'
import { Navigation } from 'react-native-navigation'


class MovieItem extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card
                key={this.props.item.id.toString() + Math.random().toString() + this.props.item.title}
                containerStyle={{
                    borderRadius: 0,
                    elevation: 4,
                    overflow: 'hidden',
                    padding: 0,
                    height: '93%',
                    width: Dimensions.get('screen').width / 3,
                    margin: 8,
                    borderRadius: 8,
                }} >
                <Navigation.Element elementId={this.props.item.id.toString()}>
                    <Image
                        style={{
                            width: "100%",
                            height: '100%',
                            flex: 0
                        }}
                        source={{ uri: baseImgPth + this.props.item.poster_path }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </Navigation.Element>

                <View style={{ borderBottomLeftRadius: 4, borderTopRightRadius: 4 }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={
                            styles.text
                        }>
                        {this.props.item.title.toString()}
                    </Text>
                </View>

            </Card>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        width: "100%",
        color: 'white',
        position: 'absolute',
        padding: 4,
        fontSize: 12,
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

