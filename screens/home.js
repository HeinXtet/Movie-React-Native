import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import { goDetail, hideTopBar, openDrawer } from '../routes/routes';
import TopBar from '../components/topbar'
import { fetchData } from '../store/actions/home/homeAction';
import { connect } from 'react-redux';



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
            <SafeAreaView style={{ backgroundColor: 'red', flex: 1, flexDirection: 'column' }}>
                <TopBar title='Home' humbergerPress={() => openDrawer()} />
                <View style={styles.container}>
                    <Text>{this.props.data}</Text>
                    <TouchableOpacity onPress={() => this.props.fetch(Math.random().toString())}>
                        <IconM name="add" size={30} color='#f33' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goDetail(this.props.componentId)}>
                        <IconM name="menu" size={30} color='#f33' />
                    </TouchableOpacity>
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
        backgroundColor: 'red',
        width: "100%",
        height: 50,

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