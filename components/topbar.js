import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { primaryColor } from '../utils/constant'
import { openDrawer, goSearch } from '../routes/routes'

class TopBar extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={{ margin: 8, zIndex: 2 }}
                    onPress={() => openDrawer(true)} >
                    <IconM name='menu' size={30} color='white' />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    color: 'white',
                    width: '100%',
                    zIndex: 1,
                    alignItems: 'center',
                    position: 'absolute', fontSize: 16
                    , textAlign: 'center'
                }}>{this.props.title}</Text>
                <View style={{ width: '100%', position: 'absolute', zIndex: 1 }}>
                    <TouchableOpacity
                        style={{ margin: 8, zIndex: 2, alignSelf: 'flex-end' }}
                        onPress={()=> {
                          //  alert("go search")
                            goSearch(this.props.componentId)
                        }} >
                        <IconM name='search' size={30} color='white' />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: primaryColor,
        width: "100%",
        height: 50,

    }
})


export default TopBar;