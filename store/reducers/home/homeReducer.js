import { FetchData, DrawerClose } from "../../actions/actionTypes";

const initState = {
    data: '',
    drawerOpen: false
}

const HomeReducer = (state = initState, action) => {
    switch (action.type) {
        case FetchData:
            return {
                ...state,
                data: 'From Redux Store - ' + action.payload
            }
        case DrawerClose:
            return {
                ...state,
                drawerOpen: true,
            }
        default:
            return state
    }
}

export default HomeReducer;
