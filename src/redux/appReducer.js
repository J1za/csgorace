import { BANNER, BONUS, CHANGE_LANG, ERROR_HIDE, ERROR_SHOW, GET_NOTIFICATIONS, HIDE_PAY, LEVEL, LOADER, OLD, ONLINE, ONLOAD, OPEN_REWARD, SERVER, SHOW_PAY, STREAMER, UPDATE_BALANCE, USER } from "./types"

const initialState = {
    loader: false,
    onLoad: false,
    user: null,
    server: null,
    serverLatency: 0,
    streamer: false,
    online: 0,
    banner: true,
    bonus: null,
    error: {
        show: false,
        data: {
            text: 'Error',
            translate: false
        }
    },
    old: false,
    hidePay: false,
    notifications: []
}

export const appReducer = ( state = initialState, action ) => {
    switch(action.type){
        case LOADER: 
            return { ...state, loader : action.payload === null ? !state.loader : action.payload }
        case ONLOAD:
            return { ...state, onLoad: true }
        case USER: 
            return { ...state, user : action.payload }
        case SERVER:
            return { ...state, server : action.payload, serverLatency: Date.now() - new Date(action.payload.syncTime).getTime(), online: action.payload.onlineUsers }
        case CHANGE_LANG: 
            return { ...state, user : state.user ? {...state.user, language: action.payload } : null}
        case UPDATE_BALANCE:
            return { ...state, user : { ...state.user, walletsBalance: [ {coin: "Fuel", amount: +((state.user.walletsBalance[0].amount + action.payload).toFixed(2)) }, state.user.walletsBalance[1] ] } }
        case ERROR_SHOW: 
            return { ...state, error : {show : true, data: action.payload }}
        case ERROR_HIDE: 
            return { ...state, error : {show : false, text: 'Error' }}
        case ONLINE: 
            return { ...state, online : action.payload }
        case BANNER: 
            return { ...state, banner: !state.banner}
        case OLD:
            return { ...state, old: action.payload }
        case BONUS: 
            return { ...state, bonus: action.payload }
        case STREAMER: 
            return { ...state, streamer: state.user?.permissions.status > 1 ? (action.payload !== undefined ? action.payload : !state.streamer) : false }
        case LEVEL:
            let newXp = state.user.xp + action.payload
            var newLevel = state.user.level
            while (newXp >= (8000*(1.11 ** (newLevel + 1) - 1)/(1.11 - 1)) && newLevel < 100) { 
                newLevel = newLevel + 1
            }
            return { ...state, user: { ...state.user, xp: newXp, level: newLevel }}
        case HIDE_PAY:
            return { ...state, hidePay: true }
        case SHOW_PAY:
            return { ...state, hidePay: false }
        case GET_NOTIFICATIONS:
            return { ...state, notifications: action.payload.map(item => ({ ...item, moment: `${new Date(item.moment).getDate()}.${new Date(item.moment).getMonth() + 1}.${new Date(item.moment).getFullYear()} ` + (new Date(item.moment).getHours() < 10 ? '0' + new Date(item.moment).getHours() : new Date(item.moment).getHours()) + ':' +  (new Date(item.moment).getMinutes() < 10 ? '0' + new Date(item.moment).getMinutes() : new Date(item.moment).getMinutes())}))}
        case OPEN_REWARD:
            return { ...state, user: { ...state.user, achievements: { ...state.user.achievements, [action.payload] : 2 } } }
        default: 
            return state
    }
}