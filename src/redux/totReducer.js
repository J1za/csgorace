import { CHANGE_SELECTED, GET_TOT, GET_TOT_REWARDS } from "./types"


const initialState = {
    tot: null,
    totSelected: 'ever',
    rewards: []
}

export const totReducer = ( state = initialState, action ) => {
    switch(action.type){
        case GET_TOT: 
            return { ...state, tot: action.payload }
        case CHANGE_SELECTED:
            return { ...state, totSelected: action.payload }
        case GET_TOT_REWARDS:
            return { ...state, rewards: action.payload}
        default: 
            return state
    }
}