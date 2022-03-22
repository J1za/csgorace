import { 
    AMOUNT_MYLTIPLY_2, 
    AMOUNT_PLUS_1, 
    AMOUNT_PLUS_10, 
    AMOUNT_PLUS_100, 
    AMOUNT_PLUS_5,
    AMOUNT_SHARE_2,
    AMOUNT_TO_MAX, 
    SET_AMOUNT, 
    SET_MAX_AMOUNT, 
    SET_MIN_AMOUNT, 
    INPUT_AMOUNT, 
    UPDATE_AMOUNT
} from "./types"

const initialState = {
    rates: [
        { id: 1, name: '+1', do: AMOUNT_PLUS_1 },
        { id: 2, name: '+5', do: AMOUNT_PLUS_5  },
        { id: 3, name: '+10', do: AMOUNT_PLUS_10  },
        { id: 4, name: '+100', do: AMOUNT_PLUS_100  },
        { id: 5, name: 'x2', do: AMOUNT_MYLTIPLY_2  },
        { id: 6, name: '1/2', do: AMOUNT_SHARE_2  },
        { id: 7, name: 'max', do: AMOUNT_TO_MAX  },
    ],
    amount: '',
    minAmount: null,
    maxAmount: null,
}

export const amountReducer = ( state = initialState, action ) => {
    switch(action.type){
        case SET_MIN_AMOUNT:
            return { ...state, minAmount: action.payload }
        case SET_MAX_AMOUNT:
            return { ...state, maxAmount: action.payload }


        case INPUT_AMOUNT: 
            let value = action.payload.value
            if(isNaN(value)){
                value = ''
            }
            return {
                ...state,
                amount: value,
                // amount: state.maxAmount < value ? state.maxAmount : value,
            }
        // case AMOUNT_PLUS_1: 
        //     return { ...state, amount: +state.amount + 1 <= state.maxAmount ? +((+state.amount + 1).toFixed(2)) : state.maxAmount }
        // case AMOUNT_PLUS_5: 
        //     return { ...state, amount: +state.amount + 5 <= state.maxAmount ? +((+state.amount + 5).toFixed(2)) : state.maxAmount }
        // case AMOUNT_PLUS_10: 
        //     return { ...state, amount: +state.amount + 10 <= state.maxAmount ? +((+state.amount + 10).toFixed(2)) : state.maxAmount }
        // case AMOUNT_PLUS_100: 
        //     return { ...state, amount: +state.amount + 100 <= state.maxAmount ? +((+state.amount + 100).toFixed(2)) : state.maxAmount }
        // case AMOUNT_MYLTIPLY_2: 
        //     return { ...state, amount: state.amount * 2 <= state.maxAmount ? +((state.amount * 2).toFixed(2)) : state.maxAmount }
        // case AMOUNT_SHARE_2: 
        //     return { ...state, amount: state.amount * 0.5 >= state.minAmount ? +((state.amount * 0.5).toFixed(2)) : state.minAmount }
        // case AMOUNT_TO_MAX: 
        //     return { ...state, amount: +((state.maxAmount).toFixed(2))  }
        case AMOUNT_PLUS_1: 
            return { ...state, amount: +((+state.amount + 1).toFixed(2)) }
        case AMOUNT_PLUS_5: 
            return { ...state, amount: +((+state.amount + 5).toFixed(2)) }
        case AMOUNT_PLUS_10: 
            return { ...state, amount: +((+state.amount + 10).toFixed(2)) }
        case AMOUNT_PLUS_100: 
            return { ...state, amount: +((+state.amount + 100).toFixed(2)) }
        case AMOUNT_MYLTIPLY_2: 
            return { ...state, amount: +((state.amount * 2).toFixed(2)) }
        case AMOUNT_SHARE_2: 
            return { ...state, amount: +((state.amount * 0.5).toFixed(2)) }
        case AMOUNT_TO_MAX: 
            return { ...state, amount: +((state.maxAmount).toFixed(2))  }
        case SET_AMOUNT: 
            return { 
                ...state, 
                // amount: action.payload.user.walletsBalance[0].amount < 1 ? action.payload.user.walletsBalance[0].amount : 1, 
                amount: '', 
                maxAmount: (action.payload.data?.maxBet || state.maxAmount) < action.payload.user.walletsBalance[0].amount ? (action.payload.data?.maxBet || state.maxAmount) : action.payload.user.walletsBalance[0].amount,
                minAmount: (action.payload.data?.minBet || state.minAmount),
            }
        case UPDATE_AMOUNT:
            return { 
                ...state, 
                maxAmount: (action.payload.data?.maxBet || state.maxAmount) < action.payload.user.walletsBalance[0].amount ? (action.payload.data?.maxBet || state.maxAmount) : action.payload.user.walletsBalance[0].amount,
                minAmount: (action.payload.data?.minBet || state.minAmount),
            }
        default: 
            return state
    }
}