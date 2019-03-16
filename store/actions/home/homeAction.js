import {FetchData} from '../actionTypes'


export const fetchData = (value) => {
    return {
        type : FetchData,
        payload : value,
    }
}