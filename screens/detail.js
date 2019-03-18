import React from 'react';
import { View, Dimensions, SafeAreaView, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { Image, Card } from 'react-native-elements'
import { baseImgPth } from '../utils/constant';
const { height } = Dimensions.get('window');

class Detail extends React.PureComponent {



    constructor(props) {
        super(props)
    }

    state = {
        screenHeight: 0
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };


    async componentDidMount() {

        Navigation.mergeOptions(this.props.componentId, {
            bottomTabs: {
                visible: false,
            },
            sideMenu: {
                left: {
                    enabled: false
                }
            }
        })
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{flexGrow:1}}
                scrollEnabled={true}
                onContentSizeChange={this.onContentSizeChange}  >
                    <View style={styles.container}>
                        <Image
                            style={styles.backImage}
                            source={{ uri: baseImgPth + this.props.payload.backdrop_path }}
                        />
                        <Card
                            key={this.props.payload.id.toString() + Math.random()}
                            containerStyle={{
                                borderRadius: 8,
                                elevation: 4,
                                overflow: 'hidden',
                                padding: 0,
                                position: "absolute",
                                bottom: -100,
                                margin: 16,
                                backgroundColor: "white",
                                height: 200,
                                width: 150
                            }} >
                            <Navigation.Element elementId={this.props.payload.id.toString()}>
                                <Image
                                    style={{ width: "100%", height: '100%', backgroundColor: 'white' }}
                                    source={{ uri: baseImgPth + this.props.payload.poster_path }}

                                />
                            </Navigation.Element>
                        </Card>

                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.titleFrame}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title} >{this.props.payload.title}</Text>
                                <Text style={{ padding: 8 }}>
                                    {'ReleaseDate :' + this.props.payload.release_date}
                                </Text>
                            </View>
                            <Text style={{ marginTop: 18, padding: 16 }}>
                                {"Description \n\n " + this.props.payload.overview}
                            </Text>
                            <Text style={{ marginTop: 18, padding: 16 }}>
                                {"Description \n\n " + this.props.payload.overview}
                            </Text>
                            <Text style={{ marginTop: 18, padding: 16 }}>
                                {"Description \n\n " + this.props.payload.overview}
                            </Text>
                            <View style={{ height: 500, backgroundColor: 'pink' }}></View>
                            <View style={{ height: 500, backgroundColor: 'black' }}></View>

                        </View>
                    </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: "100%",
        height: 250,
        backgroundColor: 'white',
    },
    backImage: {
        width: "100%",
        height: '100%'
    },
    posterImage: {
        position: "absolute",
        bottom: -100,
        margin: 16,
        backgroundColor: "black",
        height: 200,
        width: 150
    },
    titleFrame: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginLeft: 165
    },
    title: {
        fontSize: 18,
        padding: 8,
        fontWeight: 'bold',

    }

})
export default Detail;

