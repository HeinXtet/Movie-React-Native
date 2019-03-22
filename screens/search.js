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
    page = 1
    mounted = false
    totalCount = 20

    constructor(props) {
        super(props)
    }
    state = {
        search: '',
        movieList: [],
        isError: false,
        isLoadMore: false,
        isLoading: false,
    };


    _searchQuery(query) {
        if (this.totalCount >= this.page && !this.isLoadMore) {
            if (query !== "") {
                if (this.page == 1) {
                    this.setState({
                        isLoading: true,
                    })
                } else {
                    this.setState({
                        isLoadMore: true
                    })

                }
                ApiService.search(query, this.page)
                    .then(value => {
                        if (this.page == 1) {
                            if (value.results.length !== 0) {
                                this.page++

                                this.setState({
                                    isLoading: false,
                                    movieList: value.results,
                                    isError: false,
                                })
                            } else {
                                this.setState({

                                    isLoading: false,
                                    isError: true,
                                })
                            }

                        } else {
                            this.setState({
                                isLoadMore: false,
                                movieList: this.state.movieList.concat(value.results),
                            })
                            this.page++

                        }

                    })
                    .catch(e => {

                    })
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true
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

    async _searchMovie() {
        this.setState({
            movieList: [],
        })
        this.page = 1
        await this._searchQuery(this.state.search)
        // alert("page " + this.page + "lenght " + this.state.movieList.length)
    }

    _search() {
        return (
            <SearchBar
                searchSubmit={() => {
                    this._searchMovie()
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

    _loadMore() {
        return (
            <View style={styles.loadMore}>
                <ActivityIndicator color= 'red' />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', marginBottom: 62, paddingBottom: 16, }}>
                <SafeAreaView style={{
                    backgroundColor: primaryColor, marginBottom: 58,

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
                            : this.state.isError ? <ErrorView errorMessage={'Nothing to show'} /> : this.gridList()}

                        {this.state.isLoadMore ? this._loadMore() : <View />}
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
    loadMore: {
        backgroundColor: "grey",
        alignItems: 'center',
        justifyContent: "center",
        padding: 16,
        width: "100%"
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