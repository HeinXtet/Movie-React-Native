import React from 'react'
import { View, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet, FlatList, Text, Button, SafeAreaView } from 'react-native'
import SearchBar from '../components/searchBar'
import { primaryColor, baseImgPth } from '../utils/constant'
import { Navigation } from 'react-native-navigation';
import ApiService from '../network/apiService'
import ErrorView from '../components/errorView'
import Loading from '../components/loading'
import MovieItem from '../components/movieItem'
import { Card, Image } from 'react-native-elements';
const height = Dimensions.get('screen').height
import { goDetail } from '../routes/routes'
class Search extends React.PureComponent {

    constructor(props) {
        super(props)
    }
    state = {
        search: '',
        movieList: [],
        isError: false,
        isLoading: false,
        page: 1
    };


    async _searchQuery(query) {
        if (query !== "") {
            if (this.state.page == 1) {
                this.setState({
                    isLoading: true,
                })
            }
            ApiService.search(query, this.state.page)
                .then(value => {

                    if (this.state.page == 1) {
                        this.setState({
                            isLoading: false,
                            movieList: value.results,
                            page: this.state.page + 1
                        })
                    } else {
                        this.setState({
                            movieList: this.state.movieList.concat(value.results),
                            page: this.state.page + 1



                        })
                    }

                })
                .catch(e => {

                })
        }
    }


    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    enabled: false
                }
            }
        })

    }

    updateSearch = value => {
        this.setState({ search: value });
    };

    _search() {
        return (
            <SearchBar
                searchSubmit={() => {
                    this.setState({
                        movieList : [],
                        page: 1
                    })
                    this._searchQuery(this.state.search)
                }}
                back={() => Navigation.pop(this.props.componentId)}
                initValue={this.state.search}
                clearSearch={() => {
                    this.setState({
                        search: ''
                    })
                }}
                onChangeText={this.updateSearch} />

        )
    }

    loadMore() {
        this._searchQuery(this.state.search)
    }

    gridList() {
        return (
            <FlatList
                onEndReachedThreshold={1}
                onEndReached={() => this.loadMore()}
                data={this.state.movieList}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'column', margin: 1 }} onPress={() =>
                        goDetail(this.props.componentId, item)}>
                        <View >
                            <Card
                                containerStyle={{
                                    margin: 0,
                                    elevation: 4,
                                    overflow: 'hidden',
                                    padding: 0,
                                    height: height / 4,
                                    borderRadius: 8,
                                }} >
                                <Navigation.Element elementId={item.id.toString()}>
                                    <Image
                                        PlaceholderContent={<ActivityIndicator />}
                                        style={styles.imageThumbnail} source={{ uri: baseImgPth + item.poster_path }} />
                                </Navigation.Element>
                                <View style={{ borderBottomLeftRadius: 4, borderTopRightRadius: 4 }}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={
                                            styles.text
                                        }>
                                        {item.title.toString()}
                                    </Text>
                                </View>
                            </Card>
                        </View>
                    </TouchableOpacity>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{
                    backgroundColor: primaryColor, marginBottom: 58,
                    marginBottom: 56,
                }}>
                    {this._search()}
                    <View
                        style={{
                            height: "100%",
                            flexDirection: 'column',
                            backgroundColor: 'white'
                        }}>
                        {this.state.isLoading ?

                            <Loading />
                            : this.state.isError ? <ErrorView /> : this.gridList()}


                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageThumbnail: {
        height: '100%',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
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
})

export default Search;