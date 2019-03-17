import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import { goDetail, hideTopBar, openDrawer } from '../routes/routes';
import TopBar from '../components/topbar'
import { fetchData } from '../store/actions/home/homeAction';
import { connect } from 'react-redux';
import { primaryColor, commomStyle, baseImgPth } from '../utils/constant'
import Banner, { IndicaterAlign, IndicaterType } from 'react-native-whc-banner'
import { listRawData } from '../utils/constant';
import MovieList from '../components/movieList';
import ApiService from '../network/apiService';
import Loading from '../components/loading';
import ErrorView from '../components/errorView';


class Home extends React.PureComponent {

    async componentWillMount() {
        hideTopBar(this.props.componentId)
        ApiService.get('popular')
            .then(response => {
                this.setState({
                    popularList: response.results,
                })
                ApiService.get('top_rated')
                    .then(response => {
                        this.setState({
                            lastestList: response.results,
                        })

                        ApiService.get('upcoming')
                            .then(response => {
                                this.setState({
                                    isLoading: false,
                                    isError: false,
                                    bannerList: response.results,
                                })
                            }).catch(error => {
                                this.setState({
                                    isError: true,
                                    errorMessage: error
                                })
                            })
                    }).catch(error => {
                        this.setState({
                            isError: true,
                            errorMessage: error
                        })
                    })
            }).catch(error => {
                this.setState({
                    isError: true,
                    errorMessage: error
                })
            })
    }

    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this);
        this.state = {
            isLoading: true,
            isError: false,
            popularList: [],
            lastestList: [],
            bannerList: [],
            errorMessage: ''
        }
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: primaryColor, flex: 1, flexDirection: 'column' }}>
                <TopBar title='Home' humbergerPress={() => openDrawer()} />
                {this.state.isLoading ?
                    <Loading /> :
                    this.state.isError ?
                        <ErrorView errorMessage={this.state.errorMessage} /> :
                        <ScrollView style={styles.container}>
                            <View style={styles.bannerContent} >
                                <Banner autoLoop={true} style={styles.banner}>
                                    {this.state.bannerList.map((item, index) => {
                                        return (<View key={
                                            item.id.toString() + item.title + index
                                        } style={{ width: Dimensions.get('screen').width }}>
                                            <Image style={{ width: "100%", height: '100%', flex: 0 }}
                                                source={{
                                                    uri:
                                                        baseImgPth + item.backdrop_path
                                                }} />
                                        </View>
                                        )
                                    })}
                                </Banner>
                            </View>
                            <View style={styles.popular}>
                                <Text style={{ padding: 8, fontSize: 16, fontWeight: 'bold' }}>
                                    Popular Movies
                        </Text>
                                <MovieList listData={this.state.popularList} />
                            </View>
                            <View style={styles.latest}>
                                <Text style={{ padding: 8, fontSize: 16, fontWeight: 'bold' }}>
                                    Top Rated Movies
                        </Text>
                                <MovieList listData={this.state.lastestList} />
                            </View>
                        </ScrollView>}

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
        backgroundColor: 'white',
    },
    banner: {
        width: "100%",
        aspectRatio: 1.5,
        backgroundColor: "black"
    },

    bannerContent: {
        flex: 0,
        width: "100%",
    },

    popular: {
        width: "100%",
        flexDirection: 'column',
        aspectRatio: 1.7,
        backgroundColor: "white"
    },
    latest: {
        width: "100%",
        flexDirection: 'column',
        aspectRatio: 1.8,
        backgroundColor: "white"
    },

    image: {
        margin: 8,
        flex: 1,
        width: "30%",
        backgroundColor: 'red'
    }
})


const mapStateToProps = (state) => {
    return {
        data: state.homeReducer.data
    }
}



const mapDispatchToProps = dispatch => {
    return {
        fetch: (value) => {
            dispatch(fetchData(value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);