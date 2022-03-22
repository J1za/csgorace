import { 
    ADD_BET,
    CHANGE_BETS_ALL,
    ADD_ROUND, 
    CHANGE_AUTOCASH_OUT, 
    CHANGE_BANKROLL, 
    CHANGE_TITLE, 
    CURRENT_X, 
    DELAY, 
    GET_CRASH, 
    GET_CRASH_PREVIOUS, 
    INPUT_AUTOCASH_OUT, 
    INTERVAL, 
    REMOVE_BET, 
    SET_STAGE, 
    TIMEOUT, 
    SET_DELAYS,
    ADD_CASHOUT,
    NEXT_BET
} from "./types"


const initialState = {
    crash: null,
    bankroll: 0,
    previous: [],
    autoCash: true,
    autoCashAmount: '',
    stage: null,
    bets: [],
    nextBet: null,
    betsAll: [],
    cashouts: [],
    startDelay: '',
    delay: '',
    changeDelay: '',
    x: '',
    timeout: undefined,
    interval: undefined,
    title: '',
}

export const crashReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_CRASH: 
            return { 
                ...state, 
                crash: action.payload.crash, 
                bankroll: +action.payload.crash.bets?.reduce((counter, bet) => counter + bet.b_a, state.bankroll).toFixed(2) || 0,
                stage: action.payload.crash.stage,
                bets: action.payload.crash.bets?.filter(item => item.s_i === action.payload.user?.steamId) || [],
                betsAll: action.payload.crash.bets || []
            }
        case GET_CRASH_PREVIOUS: 
            return { ...state, previous: action.payload.rounds }
        case CHANGE_AUTOCASH_OUT: 
            return { ...state, autoCash: !state.autoCash, autoCashAmount: !state.autoCash ? 2 : '' }
        case INPUT_AUTOCASH_OUT: 
            let value = action.payload.value
            if(isNaN(value)){
                value = ''
            }
            return { ...state, autoCashAmount: value }
        case ADD_ROUND: 
            return { 
                ...state, 
                previous: [{ X: action.payload.X, moment: action.payload.m, roundId: action.payload.r_i }].concat(state.previous), 
                crash: { ...state.crash, previousHash: action.payload.r_h } }
        case SET_STAGE:
            return { ...state, stage: action.payload }
        case CHANGE_BANKROLL: 
            return { ...state, 
                bankroll: action.payload.clear ? 0 : +(state.bankroll + action.payload.value).toFixed(2), bets: action.payload.clear ? [] : state.bets,
                cashouts: action.payload.clear ? [] : state.cashouts
            }
        case ADD_BET: 
            return { ...state, bets: state.bets.concat(action.payload) }
        case NEXT_BET:
            return { ...state, nextBet: action.payload }
        case REMOVE_BET: 
            const deleteBet = state.bets.findIndex(item => item.b_a === action.payload.b_a)
            const bets = [...state.bets]
            bets.splice(deleteBet, 1)
            return { ...state, bets: [...bets] }
        case CHANGE_BETS_ALL: 
            return { ...state, betsAll: action.payload.clear ? [] : state.betsAll.concat(action.payload.data) }
        case ADD_CASHOUT:
            return { ...state, cashouts: state.cashouts.concat(action.payload), betsAll: state.betsAll.map(item => item.b_a === action.payload.b_a && item.s_i === action.payload.s_i ? ({ ...item, w: action.payload.w, c: action.payload.c}) : item)  }


        case SET_DELAYS: 
            return { ...state, changeDelay: action.payload.changeDelay, startDelay: action.payload.startDelay }
        case DELAY: 
            return { ...state, delay: action.payload }
        case CURRENT_X: 
            return { ...state, x: action.payload }
        case TIMEOUT:
            return { ...state, timeout: action.payload }
        case INTERVAL:
            return { ...state, interval: action.payload }
        case CHANGE_TITLE:
            return { ...state, title: action.payload }
        default: 
            return state
    }
}