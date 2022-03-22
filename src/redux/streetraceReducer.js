import { ADD_STREETRACE_BET, ADD_STREETRACE_ROUND, CHANGE_STREETRACE_BETS_ALL, CLEAN_STREETRACE, GET_STREETRACE, GET_STREETRACE_PREVIOUS, MUTE_STREETRACE, SET_STREETRACE_STAGE, STREETRACE_INTERVAL, STREETRACE_SECONDS, WINNER_STREETRACE } from "./types"

const initialState = {
    streetrace: null,
    stage: null,
    previous: [],
    seconds: 0,
    interval: null,
    bets: [],
    betsAll: [],
    speed: 0,
    winner: null,
    mute: true
}

export const streetraceReducer = ( state = initialState, action ) => {
    switch(action.type){
        case GET_STREETRACE:
            return { 
                ...state, 
                streetrace: action.payload.streetrace, 
                stage: action.payload.streetrace.stage,
                bets: action.payload.streetrace.bets?.filter(item => item.s_i === action.payload.user?.steamId) || [],
                betsAll: action.payload.streetrace.bets || [],
                winner: action.payload.streetrace.car
            }
        case GET_STREETRACE_PREVIOUS:
            return { ...state, previous: action.payload, winner: state.winner || action.payload[0].color }
        case STREETRACE_INTERVAL:
            return { ...state, interval: action.payload }
        case STREETRACE_SECONDS:
            return { ...state, seconds: action.payload }
        case SET_STREETRACE_STAGE:
            return { ...state, stage: action.payload, bets: action.payload === 1 ? [] : state.bets, betsAll: action.payload === 1 ? [] : state.betsAll }
        case ADD_STREETRACE_ROUND:
            return {
                ...state,
                previous: [{ car: action.payload.c, moment: action.payload.m, roundId: action.payload.r_i}].concat(state.previous), 
                streetrace: { ...state.streetrace, previousHash: action.payload.r_h } 
            }
        case ADD_STREETRACE_BET:
            return { ...state, bets: state.bets.concat(action.payload) }
        case CHANGE_STREETRACE_BETS_ALL: 
            return { ...state, betsAll: action.payload.clear ? [] : state.betsAll.concat(action.payload.data) }
        case WINNER_STREETRACE:
            return { ...state, winner : action.payload }
        case CLEAN_STREETRACE:
            return {
                ...state,
                streetrace: null,
                stage: null,
                previous: [],
                seconds: 0,
                interval: null,
                bets: [],
                betsAll: [],
                speed: 0,
                winner: null
            }
        case MUTE_STREETRACE: 
            return { ...state, mute : !state.mute }
        default:
            return state
    }
}