import { SHOW_TICKET_CREATE, HIDE_TICKET_CREATE, SHOW_TICKET_CREATED, HIDE_TICKET_CREATED, SHOW_ROUND_DETAIL, HIDE_ROUND_DETAIL, SHOW_CHAT_RULES, HIDE_CHAT_RULES, SHOW_MUTE, HIDE_MUTE, CHANGE_MUTE_HOURS, SHOW_TRADE, HIDE_TRADE, SHOW_DEPOSIT, HIDE_DEPOSIT, SHOW_DEPOSIT_FAILED, HIDE_DEPOSIT_FAILED, SHOW_DEPOSIT_SUCCESS, HIDE_DEPOSIT_SUCCESS, SHOW_OLD, HIDE_OLD, SHOW_STREETRACE_INFO, HIDE_STREETRACE_INFO, SHOW_FREE_INFO, HIDE_FREE_INFO, SHOW_MOBILE_MENU, HIDE_MOBILE_MENU, SHOW_MOBILE_CHAT, HIDE_MOBILE_CHAT, SHOW_MOBILE_WITHDRAWS, HIDE_MOBILE_WITHDRAWS, HIDE_LEVEL, SHOW_LEVEL, SHOW_MOBILE_NOTIFICATION, HIDE_MOBILE_NOTIFICATION } from "./types"
import { date } from '../utilites/functions'
const initialState = {
    ticketCreate : false,
    ticketCreated : {
        show: false,
        id: ''
    },
    roundDetail: false,
    round: null,
    chatRules: false,
    streetraceInfo: false,
    freeInfo: false,
    mute: false,
    muteData: {
        hours: 1,
        mute: ''
    },
    trade: false,
    tradeData: false,
    error: false,
    deposit: false,
    depositFail: false,
    depositSuccess: false,
    old: false,
    mobileChat: false,
    mobileMenu: false,
    mobileNotification: false,
    withdraw: false,
    level: false
}

export const popupReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_TICKET_CREATE: 
            return { ...state, ticketCreate: true }
        case HIDE_TICKET_CREATE: 
            return { ...state, ticketCreate: false }
        case SHOW_TICKET_CREATED: 
            return { ...state, ticketCreated: { show: true, id: action.payload || '' } }
        case HIDE_TICKET_CREATED: 
            return { ...state, ticketCreated: { show: false, id: '' } }
        case SHOW_ROUND_DETAIL: 
            return { ...state, roundDetail: true, round: {
                    roundId: action.payload.roundId,
                    date: date(action.payload.moment, 'dt'),
                    time: date(action.payload.moment, 'h'),
                    x: action.payload.X,
                    color: action.payload.color,
                    car: action.payload.car,
                    winner : action.payload.winner,
                    roundHash: action.payload.roundHash,
                    saltedHash: action.payload.saltedHash,
                    totalPlayers: action.payload.totalPlayers,
                    players: action.payload.players
                }
            }
        case HIDE_ROUND_DETAIL: 
            return { ...state, roundDetail: false, round: null }
        case SHOW_TRADE:
            return { ...state, trade: true, tradeData: action.payload }
        case HIDE_TRADE:
            return { ...state, trade: false, tradeData: null }
        case SHOW_CHAT_RULES:
            return { ...state, chatRules: true}
        case HIDE_CHAT_RULES:
            return { ...state, chatRules: false}
        case SHOW_STREETRACE_INFO:
            return { ...state, streetraceInfo: true}
        case HIDE_STREETRACE_INFO:
            return { ...state, streetraceInfo: false}
        case SHOW_FREE_INFO:
            return { ...state, freeInfo: true}
        case HIDE_FREE_INFO:
            return { ...state, freeInfo: false}
        case SHOW_MUTE:
            return { ...state, mute: true, muteData: action.payload}
        case HIDE_MUTE:
            return { ...state, mute: false }
        case CHANGE_MUTE_HOURS:
            return { ...state, muteData: { ...state.muteData, hours: action.payload }}
        case SHOW_DEPOSIT:
            return { ...state, deposit: true }
        case HIDE_DEPOSIT:
            return { ...state, deposit: false }
        case SHOW_DEPOSIT_FAILED: 
            return { ...state, depositFail: true }
        case HIDE_DEPOSIT_FAILED: 
            return { ...state, depositFail: false }
        case SHOW_DEPOSIT_SUCCESS: 
            return { ...state, depositSuccess: true }
        case HIDE_DEPOSIT_SUCCESS: 
            return { ...state, depositSuccess: false }
        case SHOW_OLD:
            return { ...state, old: true }
        case HIDE_OLD: 
            return { ...state, old: false }
        case SHOW_MOBILE_MENU:
            return { ...state, mobileMenu: true, mobileChat: false, mobileNotification: false  }
        case HIDE_MOBILE_MENU: 
            return { ...state, mobileMenu: false }
        case SHOW_MOBILE_CHAT:
            return { ...state, mobileChat: true, mobileMenu: false, mobileNotification: false  }
        case HIDE_MOBILE_CHAT: 
            return { ...state, mobileChat: false }
        case SHOW_MOBILE_WITHDRAWS:
            return { ...state, withdraw: true }
        case HIDE_MOBILE_WITHDRAWS: 
            return { ...state, withdraw: false }
        case SHOW_LEVEL:
            return { ...state, level: true }
        case HIDE_LEVEL: 
            return { ...state, level: false }
        case SHOW_MOBILE_NOTIFICATION:
            return { ...state, mobileNotification: true, mobileChat: false, mobileMenu: false }
        case HIDE_MOBILE_NOTIFICATION:
            return { ...state, mobileNotification: false }
        default: 
            return state
    }
}