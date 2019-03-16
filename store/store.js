import HomeReducer from './reducers/home/homeReducer';
import {combineReducers,createStore} from 'redux';
import SearchReducer from './reducers/search/searchReducer';


const rootReducer = combineReducers({
    homeReducer : HomeReducer,
    searchReducer : SearchReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore;
