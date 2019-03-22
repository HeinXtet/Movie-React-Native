import React from 'react';
import { View, Text, Image, NetInfo, SafeAreaView, ScrollView, Dimensions, StyleSheet } from 'react-native';
import ApiService from '../network/apiService'
import LoadingView from '../components/loading'
import ErrorView, { Error } from '../components/errorView'
import { Avatar } from 'react-native-elements';
import { baseImgPth, primaryColor } from '../utils/constant';
import { Navigation } from 'react-native-navigation'
const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width
import MovieList from '../components/movieList'
import { goDetail } from '../routes/routes'


class CastDetail extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    _Mounted = false

    state = {
        errorMessage: '',
        isLoading: true,
        isError: false,
        castDetail: null,
        movieList: []
    }
    _apiRequest() {
        ApiService.get("person/" + this.props.cast.id)
            .then(response => {
                if (this._Mounted) {
                    this.setState({
                        isLoading: false,
                        isError: false,
                        castDetail: response,
                    })
                }

            }).catch(error => {
                if (this._Mounted) {
                    this.setState({
                        isError: true,
                        isLoading: false,
                        errorMessage: error.toString()
                    })
                }

            })

        ApiService.get("/person/" + this.props.cast.id + "/movie_credits")
            .then(response => {
                if (this._Mounted) {

                    this.setState({
                        movieList: response.cast
                    })
                }

            })
    }

    componentWillUnmount() {
        this._Mounted = false
    }

    async componentDidMount() {
        this._Mounted = true
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? this._apiRequest() : this.setState({
                isError: true,
                isLoading: false,
                errorMessage: "No internet connection"

            })
        })
        Navigation.mergeOptions(this.props.componentId, {

            sideMenu: {
                left: {
                    enabled: false
                }
            },
            bottomTabs : {
                visible : false
            }
        })
    }

    goDetail = (data) => {
        goDetail(this.props.componentId, data)
    }


    _renderCastInfo() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={{
                            width: '100%',
                            height: height / 3.5,
                            alignItems: 'center',
                            backgroundColor: primaryColor
                        }}>
                            <Image
                                style={styles.avator}
                                source={{
                                    uri: baseImgPth
                                        + this.props.cast.profile_path
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: 56 }}>
                            <Text
                                style={{
                                    marginTop: 60,
                                    color: 'black',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    padding: 8

                                }}>
                                {this.props.cast.name}
                            </Text>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.title}>Place of Birth</Text>
                                <Text style={styles.answer}>{this.state.castDetail.place_of_birth}</Text>
                                <Text style={styles.title}>Birthday</Text>
                                <Text style={styles.answer}>{this.state.castDetail.birthday}</Text>
                                <Text style={styles.title}>Biography</Text>
                                <Text style={styles.answer}> {this.state.castDetail.biography}</Text>

                                <View style={styles.latest}>
                                    <Text style={{ padding: 8, fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                                        Movies of {this.props.cast.name}
                                    </Text>
                                    <MovieList
                                        listData={this.state.movieList}
                                        clickItem={(data) => this.goDetail(data)} />
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }


    render() {
        return (
            this.state.isLoading ?
                <LoadingView /> :
                this.state.isError ?
                    <ErrorView errorMessage={this.state.errorMessage} /> :
                    this._renderCastInfo()

        )
    }
}

const styles = StyleSheet.create({
    avator: {
        position: "absolute",
        bottom: -60,
        height: width / 2.5,
        width: width / 2.5,
        zIndex: 10,
        borderRadius: (width / 2.5) / 2
    },
    answer: {
        padding: 4,
        paddingLeft: 8,
        color: 'black',
        paddingBottom: 8,
        fontSize: 14,
    },
    title: {
        paddingLeft: 8,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18

    },
    latest: {
        width: "100%",
        flexDirection: 'column',
        aspectRatio: 1.6,
        backgroundColor: "white"
    },

})

export default CastDetail;