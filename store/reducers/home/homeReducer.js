import { FetchData } from "../../actions/actionTypes";

const initState =  {
    data  : ''
}

const HomeReducer = (state = initState, action) => {
    switch (action.type) {
        case FetchData:
            return {
                ...state,
                data: 'From Redux Store - ' + action.payload
            }
        default:
            return state
    }
}

export default HomeReducer;
