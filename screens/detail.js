import React from 'react';
import { View, Dimensions, NetInfo, SafeAreaView, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { Image, Card } from 'react-native-elements'
import { baseImgPth } from '../utils/constant';
const { height } = Dimensions.get('window');
import ApiService from '../network/apiService'
import CastList from '../components/castList'
import { goCastDetail } from '../routes/routes';
class Detail extends React.PureComponent {

    _isMounted = false;
    constructor(props) {
        super(props)
    }

    state = {
        castList: [],
        screenHeight: 0
    }



    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };


    _apiRequest() {
        ApiService.get("movie/" + this.props.payload.id + "/credits")
            .then(response => {
                if (this._isMounted) {

                    this.setState({
                        castList: response.cast
                    })
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    async componentDidMount() {
        this._isMounted = true
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                this._apiRequest()
            }
        }) 
     
    }


    castItemClick = (item) => {
        goCastDetail(this.props.componentId, item)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView>
                    <ScrollView automaticallyAdjustContentInsets={false}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.container}>
                                <Image
                                    style={styles.backImage}
                                    source={{
                                        uri: baseImgPth + this.props.payload.backdrop_path
                                    }}
                                />
                            </View>
                            <Card
                                key={this.props.payload.id.toString() + Math.random()}
                                containerStyle={{
                                    borderRadius: 8,
                                    elevation: 4,
                                    overflow: 'hidden',
                                    padding: 0,
                                    position: "absolute",
                                    bottom: -100,
                                    zIndex: 5,
                                    margin: 16,
                                    backgroundColor: "white",
                                    height: 200,
                                    width: 150
                                }} >
                                <Navigation.Element elementId='detail_image'>
                                    <Image
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        source={{ uri: baseImgPth + this.props.payload.poster_path }}
                                    />
                                </Navigation.Element>
                            </Card>
                        </View>
                        <View style={{ flexDirection: 'column', zIndex: 0 }}>
                            <View style={styles.titleFrame}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title} >{this.props.payload.title}</Text>
                                <Text style={{ padding: 8, color: 'black' }}>
                                    {'ReleaseDate :' + this.props.payload.release_date}
                                </Text>
                            </View>
                            <Text style={{
                                marginTop: 24,
                                paddingTop: 18,
                                paddingLeft: 16,
                                fontWeight: 'bold', fontSize: 18
                            }}>
                                Description
                            </Text>
                            <Text style={{ padding: 16, color: 'black' }}>
                                {this.props.payload.overview}
                            </Text>
                            <View>
                                {this.state.castList.length !== 0 ? <View style={styles.castFrame}>
                                    <Text style={{ paddingLeft: 16, fontWeight: 'bold', fontSize: 18 }}>
                                        Casts
                                    </Text>
                                    <CastList item={this.state.castList} castItemClick={this.castItemClick} />
                                </View> : <View />}
                            </View>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View >

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

    castFrame: {
        flex: 1,
        width: "100%",
        aspectRatio: 2.2
    },

    backImage: {
        width: "100%",
        height: '100%'
    },
    posterImage: {
        position: "absolute",
        bottom: -100,
        margin: 16,
        backgroundColor: "white",
        height: 200,
        width: 150
    },
    titleFrame: {
        zIndex: 0,
        flexDirection: 'column',
        marginLeft: 165
    },
    title: {
        fontSize: 18,
        padding: 8,
        color: 'black',
        fontWeight: 'bold',

    }

})
export default Detail;

