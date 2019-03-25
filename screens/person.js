import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import TopBar from '../components/topbar'
import { goDetail, hideTopBar, openDrawer, goSearch } from '../routes/routes';
import IconM from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
import { searchMovie } from '../store/actions/search/searchAction'
import { Navigation } from 'react-native-navigation'
import { primaryColor, baseImgPth } from '../utils/constant';
import ApiService from '../network/apiService'
import { ListItem } from 'react-native-elements'
import Loading from '../components/loading'
import Error from '../components/errorView'
import { goCastDetail} from '../routes/routes'

class Person extends React.PureComponent {
    _page = 1;
    _isMouted = false;
    _totalPage = 20;

    constructor(props) {
        super(props)

    }

    state = {
        personList: [],
        isLoading: true,
        isLoadMore: false,
        isError: false
    }


    _apiCall() {
        if (this._page <= this._totalPage && !this.state.isLoadMore) {
            if (this._page == 1) {
                if (this._isMouted) {
                    this.setState({
                        isLoading: true,
                    })
                }
            }
            ApiService.person(this._page)
                .then(value => {
                    if (this._page == 1) {
                        this._page++
                        if (this._isMouted) {
                            this.setState({
                                isLoading: false,
                                personList: value.results
                            })
                        }
                    } else {
                        this._page++
                        if (this._isMouted) {
                            this.setState({
                                isLoadMore: false,
                                personList: this.state.personList.concat(value.results)
                            })
                        }
                    }

                })
                .catch(e => {

                })
        }

    }

    _loadMore(){
        this._apiCall()
    }

    componentWillUnmount() {
        this._isMouted = false
    }

    componentDidMount() {
        this._isMouted = true
        hideTopBar(this.props.componentId)
        this._apiCall()
    }

    _loading() {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    }

    _error() {
        return (
            <View style={styles.container}>
                <Error errorMessage='Nothing to show' />
            </View>
        )
    }

    _personItem(person) {
        return (
            <ListItem
                onPress={()=>goCastDetail(this.props.componentId,person)}
                leftAvatar={{
                    source: { uri: baseImgPth + person.profile_path },
                    showEditButton: false,
                }}
                title={person.name}
            //subtitle={person.popularity.toString()}

            />
        )
    }

    _personList(list) {
        return (
            <FlatList
            onEndReachedThreshold={2.5}
                onEndReached={() => this._loadMore()}
                data={list}
                renderItem={({ item }) => (
                    this._personItem(item)
                )
                } keyExtractor={(item, index) => item.id.toString() + Math.random().toString() + item.name}
            />
        )
    }

    render() {

        return (
            <View style={{ backgroundColor: 'white', flex: 1,paddingBottom:8}}>
                <SafeAreaView style={{
                    backgroundColor: primaryColor,
                    flex: 1
                }}>
                    <View style={{ height: "100%", backgroundColor: 'white', flexDirection: 'column', marginBottom: 54 }}>
                        <TopBar title='Popular Person' humbergerPress={() => openDrawer()} openSearch={() => goSearch(this.props.componentId)} />
                        {this.state.isLoading ?
                            this._loading() :
                            this.state.isError ?
                                this._error() :
                                this._personList(this.state.personList)
                        }
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        width: "100%",
        height: 50,

    }
})

const mapToStateProps = (state) => {
    return {
        searchValue: state.searchReducer.searchValue
    }
}

const mapToStateDisptch = (dispatch) => {
    return {
        search: (value) => {
            dispatch(searchMovie(value))
        },
    }
}

// export default connect(mapToStateProps, mapToStateDisptch)(Person);
export default Person;