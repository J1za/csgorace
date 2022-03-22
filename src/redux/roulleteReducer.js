import { ADD_ROULLETE_BET, ADD_ROULLETE_ROUND, CHANGE_ROULLETE_BETS_ALL, CLEAN_ROLLETE, GET_ROULLETE, GET_ROULLETE_PREVIOUS, MUTE_ROULLETE, ROULLETE_INTERVAL, ROULLETE_SECONDS, SET_ROULLETE_STAGE, WINNER_ROULLET } from "./types"

const initialState = {
    roullete: null,
    stage: null,
    previous: [],
    seconds: 0,
    interval: null,
    bets: [],
    betsAll: [],
    speed: 0,
    winner: null,
    mute: false
}

export const roulleteReducer = ( state = initialState, action ) => {
    switch(action.type){
        case GET_ROULLETE:
            return { 
                ...state, 
                roullete: action.payload.roullete, 
                stage: action.payload.roullete.stage,
                bets: action.payload.roullete.bets?.filter(item => item.s_i === action.payload.user?.steamId) || [],
                betsAll: action.payload.roullete.bets || [],
                winner: action.payload.roullete.color
            }
        case GET_ROULLETE_PREVIOUS:
            return { ...state, previous: action.payload, winner: state.winner || action.payload[0].color }
        case ROULLETE_INTERVAL:
            return { ...state, interval: action.payload }
        case ROULLETE_SECONDS:
            return { ...state, seconds: action.payload }
        case SET_ROULLETE_STAGE:
            return { ...state, stage: action.payload, bets: action.payload === 1 ? [] : state.bets, betsAll: action.payload === 1 ? [] : state.betsAll }
        case ADD_ROULLETE_ROUND:
            return {
                ...state,
                previous: [{ color: action.payload.c, moment: action.payload.m, number: action.payload.n, roundId: action.payload.r_i}].concat(state.previous), 
                roullete: { ...state.roullete, previousHash: action.payload.r_h } 
            }
        case ADD_ROULLETE_BET:
            return { ...state, bets: state.bets.concat(action.payload) }
        case CHANGE_ROULLETE_BETS_ALL: 
            return { ...state, betsAll: action.payload.clear ? [] : state.betsAll.concat(action.payload.data) }
        case WINNER_ROULLET:
            return { ...state, winner : action.payload }
        case CLEAN_ROLLETE:
            return {
                ...state,
                roullete: null,
                stage: null,
                previous: [],
                seconds: 0,
                interval: null,
                bets: [],
                betsAll: [],
                speed: 0,
                winner: null,
            }
        case MUTE_ROULLETE: 
            return { ...state, mute : !state.mute }
        default:
            return state
    }
}