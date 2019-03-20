import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import IconM from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, primaryDarkColor } from '../utils/constant';

class SearchBar extends React.PureComponent {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.containerFrame}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: 8,
                    margin: 8,
                    borderRadius: 8,
                    backgroundColor: primaryDarkColor
                }}>
                    <IconM onPress={this.props.back} style={{ padding: 4 }} name='arrow-back' color={'white'} size={20} />
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        flex: 1,
                        height: '100%',
                        borderRadius: 8,
                        padding: 8,
                        backgroundColor: "#e0e0e0"
                    }}>
                        <IconM style={{

                            textAlign: 'center'
                        }} name='search'
                            color={'grey'}
                            size={15} />
                        <TextInput
                            onSubmitEditing={this.props.searchSubmit}
                            value={this.props.initValue}
                            onChangeText={this.props.onChangeText}
                            style={styles.textInput}
                            placeholder={'Search Movie'} />
                    </View>
                    <IconM onPress={
                        this.props.clearSearch
                    } name='close' style={{ padding: 4 }} color={'white'} size={20} />

                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    containerFrame: {
        margin: 0,
        backgroundColor: primaryColor,
    },
    inputFrame: {

    },
    textInput: {
        marginLeft: 20,
        width: '100%',
        position: 'absolute',
        padding: 16,
    },
})

export default SearchBar; 