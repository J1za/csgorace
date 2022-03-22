
import {
    ADD_WITHDRAW,
    CHANGE_LOADING,
    CHANGE_MAX,
    CHANGE_MIN,
    CHANGE_OFFSET,
    CHANGE_ORDER,
    CHANGE_SEARCH,
    CLEAR_SELECTED,
    DELETE_SKIN,
    DELETE_WITHDRAW,
    GET_SKINS,
    GET_WITHDRAW,
    LOAD_WITHDRAW,
    SET_SELECTED,
    UPDATE_WITHDRAW
} from './types'

const initialState = {
    skins: [],
    withdraw: [],
    filter: {
        search: '',
        min: '',
        max: '',
        order: ''
    },
    selected: [],
    loading: false,
    selectedPrice: 0,
    offset: 0
}

export const withdrawReducer = ( state = initialState, action ) => {
    switch(action.type){
        case GET_SKINS:
            return { ...state, skins: action.payload }
        case DELETE_SKIN:
            return { ...state, skins: state.skins.filter(item => !(+item.item_id === action.payload.i_i)) }
        case LOAD_WITHDRAW:
            return { ...state, skins: state.skins.concat(action.payload) }
        case GET_WITHDRAW:
            return { ...state, withdraw: action.payload }
        case ADD_WITHDRAW:
            return { ...state, withdraw: state.withdraw.concat(action.payload) }
        case UPDATE_WITHDRAW: 
            return { ...state, withdraw: state.withdraw.map(item => item.transaction_id === action.payload.i  ? ({ ...item, till: action.payload.t, trade_id: action.payload.s_t, status: action.payload.s }) : item ) }
        case DELETE_WITHDRAW:
            return { ...state, withdraw: state.withdraw.filter(item => !(item.transaction_id === action.payload.i))}
        case CHANGE_ORDER: 
            return { ...state, filter: { ...state.filter, order: action.payload}}
        case CHANGE_SEARCH:
            return { ...state, filter: { ...state.filter, search: action.payload}}
        case CHANGE_MAX:
            let valueMax = action.payload
            if(isNaN(valueMax)){
                valueMax = ''
            }
            return { ...state, filter: { ...state.filter, max: valueMax}}
        case CHANGE_MIN:
            let valueMin = action.payload
            if(isNaN(valueMin)){
                valueMin = ''
            }
            return { ...state, filter: { ...state.filter, min: valueMin}}
        case SET_SELECTED:
            if(state.selected.length === 1 && state.selected.find(item => item.item_id === action.payload.item_id)){
                return {
                    ...state,
                    selected: [],
                    selectedPrice: 0
                }
            }
            return { ...state, 
                selected: state.selected.find(item => item.item_id === action.payload.item_id) ? state.selected.filter(item => !(item.item_id === action.payload.item_id)) : state.selected.concat(action.payload), 
                selectedPrice: state.selected.find(item => item.item_id === action.payload.item_id) ? (state.selectedPrice - (action.payload.price) < 0 ? 0 : state.selectedPrice - (action.payload.price)) : state.selectedPrice + (action.payload.price) }
        case CLEAR_SELECTED:
            return { ...state, selected: [], selectedPrice: 0 }
        case CHANGE_LOADING:
            return { ...state, loading: action.payload }
        case CHANGE_OFFSET:
            return { ...state, offset: action.payload ? 0 : state.offset + 100 }
        default:
            return state
    }
}