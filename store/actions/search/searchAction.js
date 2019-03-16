import {SearchAction} from '../actionTypes'

export const searchMovie = (value) => {
    return {
        type: SearchAction,
        payload: value
    }
}