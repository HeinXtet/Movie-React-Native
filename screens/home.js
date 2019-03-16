import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import { goDetail, hideTopBar, openDrawer } from '../routes/routes';
import TopBar from '../components/topbar'
import { fetchData } from '../store/actions/home/homeAction';
import { connect } from 'react-redux';
import { primaryColor, commomStyle } from '../utils/constant'

import Banner, { IndicaterAlign, IndicaterType } from 'react-native-whc-banner'
import { listRawData } from '../utils/constant';


class Home extends React.PureComponent {
    async componentWillMount() {
        hideTopBar(this.props.componentId)
    }

    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this);
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: primaryColor, flex: 1, flexDirection: 'column' }}>
                <TopBar title='Home' humbergerPress={() => openDrawer()} />
                <ScrollView style={styles.container}>
                    <View style={styles.bannerContent} >
                        <Banner autoLoop={true} style={styles.banner}>
                            <View style={{ width: Dimensions.get('screen').width}}>
                                <Image style={{ width: "100%", height: '100%', flex: 0 }} source={{ uri: listRawData[0].imageUrl }} />
                            </View>
                            <View style={{ width: Dimensions.get('screen').width}}>
                                <Image style={{ width: "100%", height: '100%', flex: 0 }} source={{ uri: listRawData[1].imageUrl }} />
                            </View>
                        </Banner>
                    </View>
                    <View style={styles.popular}>
                        <Text style={{ padding: 8, fontSize: 16, fontWeight: 'bold' }}>
                            Popular Movies
                        </Text>
                        <FlatList
                            horizontal={true}
                            data={listRawData}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ width: Dimensions.get('screen').width / 3, margin: 8 }}>
                                        <Image style={{ width: "100%", height: '100%', flex: 0 }} source={{ uri: item.imageUrl }} />
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={styles.latest}>
                        <Text style={{ padding: 8, fontSize: 16, fontWeight: 'bold' }}>
                            Latest Movies
                        </Text>
                        <FlatList
                            horizontal={true}
                            data={listRawData}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ width: Dimensions.get('screen').width / 3, margin: 8 }}>
                                        <Image style={{ width: "100%", height: '100%', flex: 0 }} source={{ uri: item.imageUrl }} />
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                </ScrollView>
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
        aspectRatio: 1.8,
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