import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import TopBar from '../components/topbar'
import { goDetail, hideTopBar, openDrawer } from '../routes/routes';
import IconM from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
import { searchMovie } from '../store/actions/search/searchAction'
import {Navigation} from 'react-native-navigation'
import { primaryColor } from '../utils/constant';
class Search extends React.PureComponent {


    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this);
    }

    componentDidMount() {
        hideTopBar(this.props.componentId)
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: primaryColor, flex: 1, flexDirection: 'column' }}>
                <TopBar title='Search' humbergerPress={() => openDrawer()} />
                <View style={styles.container}>
                    <Text>Detail</Text>
                    <Text>{this.props.searchValue}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.search("SearchValue " + Math.random().toString())}>
                        <IconM name="menu" size={30} color='#f33' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => goDetail(this.props.componentId)}><IconM name="menu" size={30} color='#f33' /></TouchableOpacity>
                </View>
            </SafeAreaView>
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

export default connect(mapToStateProps, mapToStateDisptch)(Search);