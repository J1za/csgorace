import { CLEAR_OPEN_RESULT, GET_HANGARS, OPEN_HANGAR } from "./types"

const initialState = {
    hangars: [],
    openResult: null
}

export const hangarsReducer = ( state = initialState, action ) => {
    switch(action.type){
        case GET_HANGARS:
            return { ...state, hangars: action.payload.map(item => ({...item, opened: item.openedLastTime && ((new Date().getTime() - new Date(item.openedLastTime).getTime()) / (1000 * 60 * 60) % 24) < 24 })) }
        case OPEN_HANGAR:
            return { ...state, openResult: action.payload.amount , hangars: state.hangars.map(item => ({ ...item, opened: action.payload.level === item.level ? true : item.opened })) }
        case CLEAR_OPEN_RESULT:
            return { ...state, openResult: null }
            default:
            return state
    }
}