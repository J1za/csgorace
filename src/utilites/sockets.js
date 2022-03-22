import { io } from "socket.io-client";
import { store } from '../index'
import { addRound, clearChat, roundStarting, showError, setStage, changeBankroll, addBet, getAppDataHandler, roundRoulleteStarting, addRoulleteRound, roundStreetraceStarting, addStreetraceRound, deleteWithdraw, showTrade, updateBalance, changeLevel, deleteMessage, showLevel, hideTrackRace, showTrackRace } from "../redux/actions";
import { ADD_CASHOUT, ADD_GAME, ADD_ROULLETE_BET, ADD_STREETRACE_BET, CHANGE_BETS_ALL, CHANGE_LANG, CHANGE_ROULLETE_BETS_ALL, CHANGE_STREETRACE_BETS_ALL, CURRENT_X, DELAY, DELETE_SKIN, JOIN_GAME, ONLINE, REMOVE_BET, REMOVE_GAME, SEND_MESSAGE, SET_ROULLETE_STAGE, SET_STREETRACE_STAGE, UPDATE_WITHDRAW, WINNER_ROULLET, WINNER_STREETRACE } from "../redux/types";
import { crashWorkerInstanse } from "../workers/workers";

document.cookie = 'sessionId=s%3A3uHksYbI0Q3mqXIQN2JzIyZjlvPURVzH.Bie4MP6WlHJNl%2B%2FN%2FxdxtxbV9djjMX8wd9GpRyd9gFw'

const socket = io('https://csgorace.com')

export function initSockets(){
    // socket listeners

    // app
    socket.on('languageChange', data => {
        store.dispatch({type: CHANGE_LANG, payload: data})
        store.dispatch(clearChat())
        store.dispatch(getAppDataHandler())
    })

    socket.on('chatMsg', data => {
        store.dispatch({type: SEND_MESSAGE, payload: { messages: [{...data}], update: true} })
    })

    socket.on('deleteMessage', data => {
        store.dispatch(deleteMessage(data))
    })

    socket.on('onlineUsers', data => {
        store.dispatch({type: ONLINE, payload: data })
    })

    // race

    socket.on('raceCreate', data => {
        const user = store.getState().app.user
        if(user?.steamId === data.f_p.s_i){
            store.dispatch(updateBalance(data.f_p.b_a * -1))
        }
        store.dispatch({ type: ADD_GAME, payload: { game: data } })
    })
    socket.on('raceCancel', data => {
        const game = store.getState().race.games.find(item => item.r_i === data.r_i)
        const race = store.getState().race.race
        const user = store.getState().app.user
        if(game && user?.steamId === game.f_p.s_i){
            store.dispatch(updateBalance(game.f_p.b_a, race))
        }
        store.dispatch({ type: REMOVE_GAME, payload: data })
    })

    socket.on('raceResult', data => {
        const user = store.getState().app.user
        const race = store.getState().race.race
        if(user?.steamId === data.s_p.s_i){
            store.dispatch(changeLevel(200 * data.s_p.b_a))
            if(user.level % 10 === 0){
                store.dispatch(showLevel())
            }
            store.dispatch(updateBalance(data.s_p.b_a * -1, race))
            store.dispatch(showTrackRace(data))
        } else if (user?.steamId === data.f_p.s_i) {
            store.dispatch(changeLevel(200 * data.s_p.b_a))
            if(user.level % 10 === 0){
                store.dispatch(showLevel())
            }
            store.dispatch(showTrackRace(data))
        }
        setTimeout(() => {
            if(user?.steamId === data.w){
                store.dispatch(updateBalance(data.w_a, race))
            }
            store.dispatch({ type: REMOVE_GAME, payload: data })
        }, 13000)
        store.dispatch({type: JOIN_GAME, payload: data })
    })


    // crash 
    
    socket.on('crashStart', data => {
        store.dispatch(setStage(1))
        const crash = store.getState().crash.crash
        if(crash){
            store.dispatch(roundStarting(1, crash.bettingStage ))
        }
    })

    socket.on('crashWithdraw', data => {
        store.dispatch(setStage(2))
        const interval = store.getState().crash.interval
        const crash = store.getState().crash.crash
        const serverLatency = store.getState().app.serverLatency
        clearInterval(interval)
        if(crash){
            crashWorkerInstanse.postMessage({ type: 'withdraw', data: { change: crash.change, startDelay: crash.startDelay, start: data.s_s, latency: serverLatency } })
        }
        // store.dispatch({type: TIMEOUT, payload: setTimeout(() => {
        //     crashWorkerInstanse.postMessage({ type: 'withdraw', data: { delay, x, changeDelay } })
        // }, delay)})
    })

    socket.on('crashResult', data => {
        store.dispatch(setStage(0))
        store.dispatch(addRound(data))
        const timeout = store.getState().crash.timeout
        const startDelay = store.getState().crash.startDelay
        clearInterval(timeout)
        crashWorkerInstanse.postMessage({ type: 'clear' })
        store.dispatch({ type: CURRENT_X, payload: data.X })
        setTimeout(() => {
            store.dispatch({ type: CURRENT_X, payload: 1 })
        }, 2000)
        store.dispatch({ type: DELAY, payload: startDelay })
    })
    
    socket.on('crashBet', data => {
        const user = store.getState().app.user
        const crash = store.getState().crash.crash
        if(user?.steamId === data.s_i){
            store.dispatch(updateBalance(data.b_a * -1, crash))
            store.dispatch(addBet(data))
        }
        store.dispatch({ type: CHANGE_BETS_ALL, payload: { data, clear: false } })
        store.dispatch(changeBankroll({ value: data.b_a, clear: false }))
    })

    socket.on('crashCashout', data => {
        const user = store.getState().app.user
        const crash = store.getState().crash.crash
        if(user?.steamId === data.s_i){
            store.dispatch(updateBalance(data.w > crash.maxPayout ? crash.maxPayout : data.w, crash))
            store.dispatch({ type: REMOVE_BET, payload: data })
        }
        store.dispatch({ type: ADD_CASHOUT, payload: data })
    })

    // roullete

    socket.on("rouletteStart", data => {
        const roulette = store.getState().roullete.roullete
        if(roulette){
            store.dispatch({ type: WINNER_ROULLET, payload: null})
            store.dispatch(roundRoulleteStarting(1, roulette.bettingStage - 200))
            store.dispatch({ type: SET_ROULLETE_STAGE, payload: 1 })
            store.dispatch({ type: CHANGE_ROULLETE_BETS_ALL, payload: { clear: true } })
        }
    })
    socket.on('rouletteResult', data => {
        const roulette = store.getState().roullete.roullete
        const bets = store.getState().roullete.bets
        if(roulette){
            setTimeout(() => {
                if(bets.length){
                    bets.forEach(item => {
                        if(data.c === item.c){
                            if (item.c === "Green") {
                                store.dispatch(updateBalance(item.b_a * 14 > roulette.maxPayout ? roulette.maxPayout : item.b_a * 14, roulette)) 
                            } else {
                                store.dispatch(updateBalance(item.b_a * 2 > roulette.maxPayout ? roulette.maxPayout : item.b_a * 2, roulette))
                            }
                        }
                    })
                }
                store.dispatch(roundRoulleteStarting(0, roulette.preparingStage - 200))
                store.dispatch({ type: SET_ROULLETE_STAGE, payload: 0 })
                store.dispatch(addRoulleteRound(data))
            }, roulette.spinningStage)
            store.dispatch({ type: WINNER_ROULLET, payload: data.c})
            store.dispatch(roundRoulleteStarting(2, roulette.spinningStage))
            store.dispatch({ type: SET_ROULLETE_STAGE, payload: 2 })
        }
    })

    socket.on('rouletteBet', data => {
        const user = store.getState().app.user
        const roulette = store.getState().roullete.roullete
        if(user?.steamId === data.s_i){
            store.dispatch(updateBalance(data.b_a * -1, roulette))
            store.dispatch({ type: ADD_ROULLETE_BET, payload: data })
        }
        store.dispatch({ type: CHANGE_ROULLETE_BETS_ALL, payload: { data, clear: false } })
    })


    // streetrace

    socket.on("streetraceStart", data => {
        const streetrace = store.getState().streetrace.streetrace
        if(streetrace){
            store.dispatch({ type: WINNER_STREETRACE, payload: null})
            store.dispatch(roundStreetraceStarting(1, streetrace.bettingStage - 200))
            store.dispatch({ type: SET_STREETRACE_STAGE, payload: 1 })
            store.dispatch({ type: CHANGE_STREETRACE_BETS_ALL, payload: { clear: true } })
        }
    })
    socket.on('streetraceResult', data => {
        const streetrace = store.getState().streetrace.streetrace
        const bets = store.getState().streetrace.bets
        if(streetrace){
            setTimeout(() => {
                if(bets.length){
                    bets.forEach(item => {
                        if(data.c === item.c){
                            store.dispatch(updateBalance(item.b_a * 3.75 > streetrace.maxPayout ? streetrace.maxPayout : item.b_a * 3.75, streetrace))    
                        }
                    })
                }
                store.dispatch(roundStreetraceStarting(0, streetrace.preparingStage - 200))
                store.dispatch({ type: SET_STREETRACE_STAGE, payload: 0 })
                store.dispatch(addStreetraceRound(data))
            }, streetrace.spinningStage)
            store.dispatch({ type: WINNER_STREETRACE, payload: data.c})
            store.dispatch(roundStreetraceStarting(2, streetrace.spinningStage))
            store.dispatch({ type: SET_STREETRACE_STAGE, payload: 2 })
        }
    })

    socket.on('streetraceBet', data => {
        const user = store.getState().app.user
        const streetrace = store.getState().streetrace.streetrace
        if(user?.steamId === data.s_i){
            store.dispatch(updateBalance(data.b_a * -1, streetrace))    
            store.dispatch({ type: ADD_STREETRACE_BET, payload: data })
        }
        store.dispatch({ type: CHANGE_STREETRACE_BETS_ALL, payload: { data, clear: false } })
    })


    // withdraw 
    
    socket.on('waxpeerWithdrawal', data => {
        store.dispatch({ type: DELETE_SKIN, payload: data })
    })
    
    socket.on('statusWaxpeer', data => {
        console.log('data', data)
        if(data.s === 1) {
            store.dispatch({ type: UPDATE_WITHDRAW, payload: data })
            if(!window.location.pathname.includes('withdraw')){
                store.dispatch(showTrade(data.i))
            }
        } else if (data.s === 2 || data.s === 3) {
            store.dispatch(deleteWithdraw(data))
        }
    })

    socket.on('connect_error', error => {
        store.dispatch(showError({text: 'Server is temporarily down', translate: false}))
    })
    socket.on('msg', error => {
        store.dispatch(showError({text: error, translate: false}))
    })
}

export default socket