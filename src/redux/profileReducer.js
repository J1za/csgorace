import { CHANGE_API_KEY, CHANGE_CODE, CHANGE_RESULTS_LOADING, CHANGE_RESULTS_OFFSET, CHANGE_TRADE_URL, GET_PROFILE, GET_PROFILE_RESULTS, GET_PROFILE_REWARDS, LOAD_PROFILE_RESULTS, REFERRAL, REVERSE_REWARD, UPDATE_REFFERAL } from "./types"

const initialState = {
    profile: null,
    codeWon : null,
    results: [],
    offset: 0,
    loading: false,
    rewards: [],
    referal: null
}

export const profileReducer = ( state = initialState, action ) => {
    switch(action.type){
        case GET_PROFILE:
            return { ...state, profile: action.payload }
        case GET_PROFILE_REWARDS:
            return { ...state, rewards: action.payload.map(item => ({...item, info: false})) }
        case REVERSE_REWARD:
            return { ...state, rewards: state.rewards.map(item => item.id === action.payload ? ({...item, info: !item.info}) : item) }
        case CHANGE_CODE:
            return { ...state, codeWon: action.payload }
        case GET_PROFILE_RESULTS:
            return { ...state, results: action.payload.rounds }
        case LOAD_PROFILE_RESULTS:
            return { ...state, results: action.payload.clear ? [] : state.results.concat(action.payload.rounds) }
        case CHANGE_RESULTS_OFFSET:
            return { ...state, offset: action.payload ? 0 : state.offset + 30 }
        case CHANGE_TRADE_URL:
            return { ...state, profile : { ...state.profile, steamTradeURL: action.payload } }
        case CHANGE_API_KEY:
            return { ...state, profile : { ...state.profile, steamApiKey: action.payload } }
        case CHANGE_RESULTS_LOADING:
            return { ...state, loading: action.payload }
        case REFERRAL: 
            return { ...state, referal: action.payload }
        case UPDATE_REFFERAL: 
            return { ...state, referal: {
                ...state.referal,
                profit: {
                    ...state.referal.profit,
                    available: state.referal.profit.available - action.payload
                }
            }}
        default:
            return state
    }
}