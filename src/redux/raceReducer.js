import {
    GET_RACE,
    ADD_GAME,
    REMOVE_GAME,
    JOIN_GAME,
    SHOW_TRACK,
} from './types'

const initialState = {
    race: null,
    games: [],
    showTrack: null
}

 
export const raceReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_RACE: 
            return { 
                ...state, 
                race: action.payload.race, 
                games: action.payload.race.games.map(item => ({...item, r_i: item.roundId, f_p: item.players[0], s_p: item.players[1]}))
            }
        case ADD_GAME: 
            return { 
                ...state, 
                games: state.games.concat(action.payload.game),  
            }
        case SHOW_TRACK: 
            return { ...state, showTrack: action.payload }
        case REMOVE_GAME: 
            return { ...state, games: state.games.filter(item => !(item.r_i === action.payload.r_i)) }
        case JOIN_GAME: 
            return { ...state, games: state.games.map(item => item.r_i === action.payload.r_i ? ({...item, s_p: action.payload.s_p, w: action.payload.w, r_h: action.payload.r_h, w_a: action.payload.w_a  }) : item) }
        default: 
            return state
    }
}