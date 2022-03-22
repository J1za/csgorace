import { CHANGE_DEPOSIT_AMOUNT, CHANGE_DEPOSIT_METHOD, GET_DEPOSIT } from "./types"

const initialState = {
    method: null,
    minSumm: null,
    amount: '',
    coinbaseId: ''
}

export const depositReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_DEPOSIT_METHOD:
            return { ...state, method: action.payload.method === state.method ? null : action.payload.method, minSumm: action.payload.method === state.method ? null : action.payload.minSumm }
        case CHANGE_DEPOSIT_AMOUNT:
            let value = action.payload
            if(isNaN(value)){
                value = ''
            }
            if( value > 5000 ){
                value = 5000
            }
            return {
                ...state,
                amount: value
            }
        case GET_DEPOSIT:
            return { ...state, coinbaseId: action.payload.coinbaseId }
        default:
            return state
    }
}