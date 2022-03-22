import { 
    CHANGE_CREATE_ISSUE, 
    CHANGE_CREATE_LANG, 
    CHANGE_CREATE_REASON, 
    CLEAR_CREATE_POPUP, 
    CLOSE_TICKET, 
    CREATE_TICKET, 
    GET_TICKET, 
    GET_TICKETS, 
    SEND_MESSAGE_TICKET,
    CHANGE_MESSAGE_TICKET
} from "./types"
import { date } from "../utilites/functions"
const initialState = {
    tickets: [],
    create: {
        reason: null,
        lang: null,
        message: '',
    },
    ticket: null,
    ticketMessage: ''
}

export const ticketReducer = ( state = initialState, action ) => {
    switch(action.type){
        case GET_TICKETS: 
            return { ...state, tickets: action.payload.map(item => ({...item, moment: date(item.moment, 'd')})) }
        case CREATE_TICKET: 
            return { ...state, tickets: state.tickets.concat({...action.payload, moment: date(action.payload.moment, 'd')}) }
        
        case GET_TICKET: 
            return { ...state, ticket: action.payload }
        case CLOSE_TICKET: 
            return { ...state, ticket: null }
        case SEND_MESSAGE_TICKET: 
            return { ...state, ticket: {...state.ticket, messages: state.ticket.messages.concat(action.payload) }, ticketMessage: '' }
        case CHANGE_MESSAGE_TICKET: 
            return { ...state, ticketMessage: action.payload }

        case CHANGE_CREATE_REASON: 
            return { ...state, create: { ...state.create, reason: action.payload } }
        case CHANGE_CREATE_LANG: 
            return { ...state, create: { ...state.create, lang: action.payload } }
        case CLEAR_CREATE_POPUP: 
            return { ...state, create: { reason: null, lang: null, message: '' } }
        case CHANGE_CREATE_ISSUE: 
            return { ...state, create: { ...state.create, message: action.payload } }
        default: 
            return state
    }
}