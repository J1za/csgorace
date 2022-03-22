import { CLEAR_CHAT, DELETE_MESSAGE, SEND_MESSAGE, SHOW_CHAT } from "./types"

let initialState = {
    messages : [],
    newMessagesCount: 0,
    chat: false
}

export const chatReducer = (state = initialState, action) => {
    switch(action.type){
        case SEND_MESSAGE: 
            return {...state, messages: state.messages.concat(action.payload.messages.map(item => ({...item, d: (new Date(item.d).getHours() < 10 ? '0' + new Date(item.d).getHours() : new Date(item.d).getHours()) + ':' +  (new Date(item.d).getMinutes() < 10 ? '0' + new Date(item.d).getMinutes() : new Date(item.d).getMinutes())}))), newMessagesCount: state.chat && action.payload.update ? state.newMessagesCount + 1 : 0}
        case CLEAR_CHAT: 
            return {...state, messages: []}
        case SHOW_CHAT: 
            return { ...state, chat : !state.chat, newMessagesCount: 0 }
        case DELETE_MESSAGE:
            return { ...state, messages: state.messages.filter(item => !(item.i === action.payload)) }
        default: 
            return state
    }
}