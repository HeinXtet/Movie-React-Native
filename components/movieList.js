import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import MovieItem from '../components/movieItem'
class MovieList extends React.PureComponent {


    render() {
        return (
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.props.listData}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => this.props.clickItem(item)}>
                            <MovieItem item={item} />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => item.id.toString() + Math.random().toString() + item.title
                }
            />

        )
    }

}

export default MovieList;