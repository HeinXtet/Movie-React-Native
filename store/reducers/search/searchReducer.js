
import { SearchAction } from '../../actions/actionTypes'
const initState = {
    searchValue: ''
}

export const SearchReducer = (state = initState, action) => {
    switch (action.type) {
        case SearchAction:
            return {
                ...state,
                searchValue: action.payload
            }
        default:
            return state;
    }
}

export default SearchReducer;
