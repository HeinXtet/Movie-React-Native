import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import MovieItem from '../components/movieItem'
class MovieList extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <FlatList
                horizontal={true}
                data={this.props.listData}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => alert(item.title)}>
                            <MovieItem item={item} />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => item.id.toString() + index.toString()}
            />

        )
    }

}

export default MovieList;