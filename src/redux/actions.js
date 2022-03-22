import { 
    CHANGE_CREATE_ISSUE, 
    CHANGE_CREATE_LANG, 
    CHANGE_CREATE_REASON, 
    SHOW_TICKET_CREATE, 
    HIDE_TICKET_CREATE, 
    SHOW_TICKET_CREATED, 
    HIDE_TICKET_CREATED, 
    CLEAR_CHAT, 
    CLEAR_CREATE_POPUP, 
    CREATE_TICKET, 
    ERROR_HIDE, 
    ERROR_SHOW, 
    GET_TICKETS, 
    LOADER, 
    NAV, 
    USER, 
    GET_TICKET,
    CLOSE_TICKET,
    CHANGE_MESSAGE_TICKET,
    SEND_MESSAGE_TICKET,
    GET_RACE,
    UPDATE_BALANCE,
    SET_AMOUNT,
    INPUT_AMOUNT,
    GET_CRASH,
    GET_CRASH_PREVIOUS,
    CHANGE_AUTOCASH_OUT,
    INPUT_AUTOCASH_OUT,
    SERVER,
    ADD_ROUND,
    INTERVAL,
    CHANGE_TITLE,
    SET_STAGE,
    CHANGE_BANKROLL,
    ADD_BET,
    SET_DELAYS,
    SHOW_ROUND_DETAIL,
    HIDE_ROUND_DETAIL,
    NEXT_BET,
    SEND_MESSAGE,
    SHOW_CHAT,
    SHOW_CHAT_RULES,
    HIDE_CHAT_RULES,
    SHOW_MUTE,
    HIDE_MUTE,
    CHANGE_MUTE_HOURS,
    BANNER,
    CHANGE_BETS_ALL,
    GET_TOT,
    GET_SKINS,
    CHANGE_SELECTED,
    CHANGE_ORDER,
    CHANGE_SEARCH,
    CHANGE_MIN,
    CHANGE_MAX,
    SET_SELECTED,
    LOAD_WITHDRAW,
    CHANGE_LOADING,
    CHANGE_OFFSET,
    GET_TOT_REWARDS,
    GET_ROULLETE,
    GET_ROULLETE_PREVIOUS,
    ADD_ROULLETE_ROUND,
    CLEAN_ROLLETE,
    ROULLETE_SECONDS,
    ROULLETE_INTERVAL,
    GET_STREETRACE,
    GET_STREETRACE_PREVIOUS,
    ADD_STREETRACE_ROUND,
    CLEAN_STREETRACE,
    STREETRACE_INTERVAL,
    STREETRACE_SECONDS,
    SET_STREETRACE_STAGE,
    GET_PROFILE,
    CHANGE_CODE,
    GET_PROFILE_RESULTS,
    CHANGE_TRADE_URL,
    CHANGE_RESULTS_LOADING,
    LOAD_PROFILE_RESULTS,
    CHANGE_RESULTS_OFFSET,
    GET_WITHDRAW,
    ADD_WITHDRAW,
    DELETE_WITHDRAW,
    HIDE_TRADE,
    SHOW_TRADE,
    UPDATE_AMOUNT,
    GET_HANGARS,
    HIDE_DEPOSIT,
    CHANGE_DEPOSIT_METHOD,
    CHANGE_DEPOSIT_AMOUNT,
    SHOW_DEPOSIT,
    GET_DEPOSIT,
    SHOW_DEPOSIT_FAILED,
    HIDE_DEPOSIT_FAILED,
    SHOW_DEPOSIT_SUCCESS,
    HIDE_DEPOSIT_SUCCESS,
    SHOW_OLD,
    HIDE_OLD,
    OLD,
    ONLOAD,
    OPEN_HANGAR,
    CLEAR_OPEN_RESULT,
    SHOW_STREETRACE_INFO,
    HIDE_STREETRACE_INFO,
    SHOW_FREE_INFO,
    HIDE_FREE_INFO,
    CHANGE_API_KEY,
    MUTE_STREETRACE,
    MUTE_ROULLETE,
    LEVEL,
    DELETE_MESSAGE,
    STREAMER,
    REFERRAL,
    SHOW_MOBILE_CHAT,
    HIDE_MOBILE_CHAT,
    SHOW_MOBILE_MENU,
    HIDE_MOBILE_MENU,
    SHOW_MOBILE_WITHDRAWS,
    HIDE_MOBILE_WITHDRAWS,
    BONUS,
    UPDATE_REFFERAL,
    SHOW_TRACK,
    HIDE_LEVEL,
    SHOW_LEVEL,
    HIDE_PAY,
    SHOW_PAY,
    GET_NOTIFICATIONS,
    SHOW_MOBILE_NOTIFICATION,
    HIDE_MOBILE_NOTIFICATION,
    CLEAR_SELECTED,
    GET_PROFILE_REWARDS,
    REVERSE_REWARD,
    OPEN_REWARD,
} from "./types";

import { history } from '../index'


 

import { banUser, closeTicket, createTicket, getAccount, getCrash, getCrashPrevious, getMessages, getRace, getServer, getTicket, getTickets, getTot, muteUser, sendTicketMessage, getWithdraw, outWithdraw, getTotRewards, getRoullete, getRoulletePrevious, getStreetrace, getStreetracePrevious, checkWithdraw, getProfile, sendCode, getProfileResults, changeTradeUrl, getTransactions, getHangars, depositFreekassa, depositCoinbase, openHangar, depositQiwi, depositSkins, changeApiKey, referralCode, getProfit, getRedeem, getRefferals, editCode, getNotifications, getProfileRewards, claimRewards } from "../utilites/api";
import socket, { initSockets } from '../utilites/sockets'
import { crashWorkerInstanse } from "../workers/workers";

export function init(){
    return async (dispatch, getState) => {
        try {
            const old = localStorage.getItem('old') === 'false' || !localStorage.getItem('old') ? false : true
            const streamer = localStorage.getItem('streamer') === 'false' || !localStorage.getItem('streamer')  || localStorage.getItem('streamer') === 'undefined' ? false : true
            localStorage.setItem('streamer', streamer)
            if(!old){
                dispatch(showOld())
            }
            dispatch({ type: OLD, payload: old })
            const muteStreetrace = localStorage.getItem('muteStreetrace') === 'false' ? false : true
            const muteRoullete = localStorage.getItem('muteRoullete') === 'false' || !localStorage.getItem('muteRoullete')  || localStorage.getItem('muteRoullete') === 'undefined' ? false : true
            console.log(muteStreetrace, getState().streetrace.mute)
            if(getState().streetrace.mute !== muteStreetrace){
                dispatch(changeMuteStreetrace())
            }
            if(getState().roullete.mute !== muteRoullete){
                dispatch(changeMuteRoullete())
            }
            const hidePayVar = localStorage.getItem('hidePay') === 'false' || !localStorage.getItem('hidePay')  || localStorage.getItem('hidePay') === 'undefined' ? false : true
            if(hidePayVar){
                dispatch(hidePay())
            }
            const bannerVar = localStorage.getItem('bannerVar') === 'false' || !localStorage.getItem('bannerVar')  || localStorage.getItem('bannerVar') === 'undefined' ? false : true
            if(bannerVar){
                dispatch(hideBanner())
            }
            // changeBanner
            initSockets()
            let response = await getAccount()
            if(response.success){
                dispatch({ type: USER, payload: response.data})
                if(streamer !== 'undefined'){
                    dispatch({ type: STREAMER, payload: streamer })
                }
                // if(!window.location.pathname.includes('streetrace') && !window.location.pathname.includes('free')){
                if(!window.location.pathname.includes('free') && !window.location.pathname.includes('streetrace')){
                    dispatch(changeLoader())
                }
                dispatch(getAppDataHandler())
                dispatch({ type: ONLOAD })
            } else {
                throw new Error()
            }
        } catch {
            dispatch(getAppDataHandler())
            dispatch({ type: ONLOAD })
            if(!window.location.pathname.includes('streetrace') && !window.location.pathname.includes('free')){
                setTimeout(() => {
                    dispatch(changeLoader())
                }, 1000)
            }
        }
    }
}

export function getAppDataHandler() {
    return async (dispatch, getState) => {
        try {
            const userLang = getState().app.language
            const lang = userLang || localStorage.getItem('i18nextLng') || 'ru'
            const response = await Promise.all([getServer(), getMessages(lang), getNotifications()])
            if(response[0].success){
                dispatch({type: SERVER, payload: response[0].data})
            } else {
                dispatch(showError({text: response[0].msg, translate: false}))
            }
            if(response[1].success){
                dispatch({type: SEND_MESSAGE, payload: { messages: response[1].data, update: false }})
            } else {
                dispatch(showError({text: response[1].msg, translate: false}))
            }
            if(response[2].success){
                dispatch({type: GET_NOTIFICATIONS, payload: response[2].data})
            } else {
                dispatch(showError({text: response[2].msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function changeLoader(flag = null){
    return {
        type: LOADER,
        payload: flag
    }
}

export function changeLang(lang){
    return async () => {
        socket.emit('languageChange', lang)
    }
}

export function changeStreamer(){
    return async (dispatch, getState) => {
        const streamer = getState().app.streamer
        localStorage.setItem('streamer', !streamer)
        dispatch({ type: STREAMER })
    }
}

export function changeLevel(xp){
    return {
        type: LEVEL,
        payload: xp
    }
}

export function updateBalance(balance, data){
    return async dispatch => {
        dispatch({ type: UPDATE_BALANCE, payload: balance })
        dispatch(updateAmount(data))
    }
}

let error = false
export function showError(data){
    return async dispatch => {
        if(!error){
            dispatch({type: ERROR_SHOW, payload: data})
            setTimeout(() => {
                dispatch(hideError())
                error = false
            }, 3000)
            error = true
        }
    }
}

export function hideError(text){
    return {
        type: ERROR_HIDE,
        payload: text
    }
}

export function changeNav(index){
    return {
        type: NAV,
        payload: { index }
    }
}

export function changeBanner() {
    return {
        type: BANNER,
        payload: false
    }
}

export function hideBanner() {
    return async dispatch => {
        localStorage.setItem('bannerVar', true)
        dispatch({ type: BANNER, payload: false })
    }
}

export function showBanner() {
    return async dispatch => {
        localStorage.setItem('bannerVar', false)
        dispatch({ type: BANNER, payload: false })
    }
}

export function sendCodeHandler (code) {
    return async dispatch => {
        try {
            if(!code.trim().length){
                dispatch(showError({text: 'Enter code', translate: false}))
                return
            }
            const response = await sendCode(code)
            if(response.success){
                dispatch(changeCode(response.data.amount))
                dispatch({ type: UPDATE_BALANCE, payload: response.data.amount })
                setTimeout(() => {
                    dispatch(changeCode(null))
                }, 3000)
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function changeCode (win) {
    return {
        type: CHANGE_CODE,
        payload: win
    }
}



export function getProfileResultsHandler (results, concat) {
    return async (dispatch, getState) => {
        try {
            const loading = getState().profile.loading
            const offset = getState().profile.offset
            if(!loading){
                dispatch({ type: CHANGE_RESULTS_LOADING, payload: true })
                const id = getState().profile.profile?.steamId
                const response = results === 'transactions' ? await getTransactions(offset) : await getProfileResults(results, id, offset)
                if(response.success){
                    dispatch({ type: concat ? LOAD_PROFILE_RESULTS : GET_PROFILE_RESULTS, payload: { rounds: results === 'transactions' ? response.data : response.data.rounds, clear : false } })
                    dispatch({ type: CHANGE_RESULTS_LOADING, payload: false })
                    dispatch({ type: CHANGE_RESULTS_OFFSET })
                } else {
                    dispatch({ type: CHANGE_RESULTS_LOADING, payload: false })
                    dispatch({ type: GET_PROFILE_RESULTS, payload: { rounds: [], clear : true } })
                }
            } else {
                return false
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function getProfileReferalHandler(){
    return async (dispatch, getState) => {
        try {
            let data = { profit: {}, refferals: {} }
            // const status = getState().app.user?.permissions?.status !== 1
            // const response = await Promise.all(status ? [getProfit(), getRefferals()] : [getProfit()])
            const response = await Promise.all([getProfit()])
            if(response[0].success){
                data.profit = response[0].data
            } else {
                dispatch(showError({text: response[0].msg, translate: false}))
            }
            // if(status){
            //     if(response[1].success){
            //         data.refferals = response[1].data
            //     } else {
            //         dispatch(showError({text: response[1].msg, translate: false}))
            //     }
            // }
            dispatch({ type: REFERRAL, payload: data })
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function getRedeemHandler() {
    return async dispatch => {
        try {
            const response = await getRedeem()
            if(response.success){
                dispatch(updateBalance(response.data.amount))
                dispatch({ type: UPDATE_REFFERAL, payload: response.data.amount })
                // data.profit = response.data
                // dispatch(showError({text: 'Code edited', translate: false, success: true}))
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function editCodeHandler(code) {
    return async (dispatch, getState) => {
        const language = getState().app.user?.language
        try {
            const response = await editCode(code)
            if(response.success){
                // data.profit = response.data
                dispatch(showError({text: language === 'en' ?  'Code edited' : 'Код изменен', translate: false, success: true}))
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function changeTradeUrlHandler (tradeUrl) {
    return async dispatch => {
        try {
            if(!tradeUrl.trim().length){
                dispatch(showError({text: 'Enter url', translate: false}))
                return
            }
            const response = await changeTradeUrl(tradeUrl)
            if(response.success){
                dispatch({ type: CHANGE_TRADE_URL, payload: response.data.tradeURL })
                dispatch(showError({text: 'trade', translate: true, success: true}))
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function changeApiKeyHandler (apiKey) {
    return async dispatch => {
        try {
            if(!apiKey.trim().length){
                dispatch(showError({text: 'Enter key', translate: false}))
                return
            }
            const response = await changeApiKey(apiKey)
            if(response.success){
                dispatch({ type: CHANGE_API_KEY, payload: response.data.steamApiKey })
                dispatch(showError({text: 'key', translate: true, success: true}))
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

//chat

export function sendMessage(message){
    return async () => {
        if(message.length) {
            socket.emit('chatMsg', message)
        }
    }
}

export function clearChat(){
   return {
        type: CLEAR_CHAT,   
   }
}

export function showChat(){
    return {
        type: SHOW_CHAT,  
    }
}

export function muteUserHandler(data){
    return async dispatch => {
        try {
            const response = await muteUser(data)
            if(response.success){
                dispatch(showError({text: 'User muted', translate: false}))
                dispatch(hideMute())
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function sendDeleteMessage(id) {
    return async () => {
        if(id) {
            socket.emit('deleteMessage', id)
        }
    }
}

export function deleteMessage(id) {
    return  {
        type: DELETE_MESSAGE,
        payload: id
    }
}


export function banUserHandler(id){
    return async dispatch => {
        try {
            const response = await banUser({ ban: id })
            if(response.success){
                dispatch(showError({text: 'User has been banned', translate: false}))
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

//tickets

export function getTicketsHandler(){
    return async dispatch => {
        try {
            const response = await getTickets()
            if(response.success){
                dispatch({type: GET_TICKETS, payload: response.data })
            }
        } catch {

        }
    }
}

export function getTicketHandler(id){
    return async dispatch => {
        try {
            const response = await getTicket(id)
            if(response.success){
                dispatch({type: GET_TICKET, payload: response.data })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
                window.location.href = "/faq"
            }
        } catch {

        }
    }
}

export function closeTicketHandler(id){
    return async dispatch => {
        try {
            const response = await closeTicket({id})
            if(response.success){
                dispatch(clearTicketHandler())
                history.goBack()
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch {

        }
    }
}

export function clearTicketHandler(){
    return {
        type: CLOSE_TICKET
    }
}

export function changeTicketMessage(message){
    return {
        type: CHANGE_MESSAGE_TICKET,
        payload: message
    }
}

export function sendTicketMessageHandler(data){
    return async dispatch => {
        try {
            if (!(10 < data.msg.trim().length && data.msg.trim().length < 600)){
                throw  new Error('errors:incorectNumber')
            }
            const response = await sendTicketMessage(data)
            if(response.success){
                dispatch({ type: SEND_MESSAGE_TICKET, payload: { user: data.msg, userTime: new Date() } })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
                dispatch(changeTicketMessage(''))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: true}))
        }
    }
}


export function createTicketHandler(data){
    return async dispatch => {
        try {
            if(!data.reason?.length){
                throw  new Error('errors:enterReason')
            } else if (!(10 < data.msg.trim().length && data.msg.trim().length < 600)){
                throw  new Error('errors:incorectNumber')
            }
            const response = await createTicket(data)
            if(response.success){
                dispatch({type: CREATE_TICKET, payload: response.data })
                dispatch(hideTicketCreatePopup())
                dispatch(clearTicketCreatePopup())
                setTimeout(() => {
                    dispatch(changeTicketCreatedPopup(response.data?.id))
                }, 300)
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: true}))
        }
    }
}

export function hidePay() {
    return async dispatch => {
        localStorage.setItem('hidePay', true)
        dispatch({ type: HIDE_PAY })
    }
}

export function showPay() {
    return async dispatch => {
        localStorage.setItem('hidePay', false)
        dispatch({ type: SHOW_PAY })
    }
}


// create ticket form
export function changeTicketCreateReason(id){
    return {
        type: CHANGE_CREATE_REASON,   
        payload: id
    }
}

export function changeTicketCreateLang(id){
    return {
        type: CHANGE_CREATE_LANG,   
        payload: id
    }
}

export function changeTicketCreateMessage(value){
    return {
        type: CHANGE_CREATE_ISSUE,   
        payload: value
    }
}

export function clearTicketCreatePopup(){
    return {
        type: CLEAR_CREATE_POPUP,   
    }
}


//amount

export function setAmount (data) {
    return async (dispatch, getState) => {
        const user = getState().app.user
        if(user){
            dispatch({type: SET_AMOUNT, payload: { data, user }})
        }
    }
}

export function updateAmount (data) {
    return async (dispatch, getState) => {
        const user = getState().app.user
        if(user){
            dispatch({type: UPDATE_AMOUNT, payload: { user, data }})
        }
    }
}

export function inputAmount (value) {
    return async (dispatch, getState) => {
        const user = getState().app.user
        if(user){
            dispatch({type: INPUT_AMOUNT, payload: { value: value }})
        }
    }
}



//race

export function getRaceHandler(){
    return async dispatch => {
        try {
            const response = await getRace()
            if (response.success){
                dispatch({type: GET_RACE, payload: { race: response.data } })
                dispatch(setAmount(response.data))
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function createGame(amount){
    return async () => socket.emit('raceCreate', { b_a: +amount })
}

export function cancelGame(id){
    return async () => socket.emit('raceCancel', { r_i: id })
}

export function joinGame(data){
    return async () => socket.emit('raceBet', { r_i: data.id, b_a: data.amount })
}

export function showTrackRace(race){
    return {
        type: SHOW_TRACK,
        payload: race
    }
}

export function hideTrackRace(){
    return {
        type: SHOW_TRACK,
        payload: null
    }
}

// crash


export function getCrashHandler(){
    return async (dispatch, getState) => {
        try {
            const user = getState().app.user
            const serverLatency = getState().app.serverLatency
            const response = await Promise.all([getCrash(), getCrashPrevious()])
            if (response[0].success){
                dispatch({type: GET_CRASH, payload:{ crash: response[0].data, user } })
                dispatch(setAmount(response[0].data))


                // this timing
                const crash = response[0].data

                // dispatch({ type: DELAY, payload: crash.startDelay })
                dispatch({ type: SET_DELAYS, payload: { startDelay: crash.startDelay, changeDelay: 1 / crash.change }})
                // Math.log(1/change (Sn*(1/change-1)/startDelay +1))
                const time = new Date() - new Date(crash.start)
                if (crash.stage === 0) {
                    dispatch(roundStarting(crash.stage, crash.preparingStage - time))
                } else if (crash.stage === 1) {
                    dispatch(roundStarting(crash.stage, crash.preparingStage + crash.bettingStage - time))
                } else if (crash.stage === 2){
                    crashWorkerInstanse.postMessage({ type: 'withdraw', data: { change: crash.change, startDelay: crash.startDelay, start: crash.spinningStart, latency: serverLatency } })
                    // dispatch({ type: DELAY, payload: crash.delay })
                    // dispatch({ type: TIMEOUT, payload: setTimeout(() => {
                    //     crashWorkerInstanse.postMessage({ type: 'withdraw', data: { x: crash.currentX, changeDelay: crash.change + 0.0007, delay: crash.startDelay} })
                    // }, crash.delay) })
                    // // dispatch({ type: TIMEOUT, payload: setTimeout(() => dispatch(withdrawHandler()), crash.delay ) })
                }

            } else {
                dispatch(showError({text: response[0].msg, translate: false}))
            }
            if (response[1].success){
                dispatch({type: GET_CRASH_PREVIOUS, payload: response[1].data })
            } else {
                dispatch(showError({text: response[1].msg, translate: false}))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function changeAutoCash(){
    return {
        type: CHANGE_AUTOCASH_OUT
    }
}

export function inputAutoCash(value){
    return async (dispatch, getState) => {
        const user = getState().app.user
        if(user){
            dispatch({type: INPUT_AUTOCASH_OUT, payload: { value: value }})
        }
    }
}

export function addRound (round) {
    return {
        type: ADD_ROUND,
        payload: round
    }
}

export function setStage (stage) {
    return async dispatch => {
        if(stage === 1) {
            dispatch(changeBankroll({ clear: true }))
            dispatch({ type: CHANGE_BETS_ALL, payload: { data : [], clear: true } })
        }
        dispatch({ type: SET_STAGE, payload: stage })
    }
}

export function crashBetHandler (data = null) {
    return async (dispatch, getState) => {
        const level = getState().app.user.level
        if(data){
            socket.emit('crashBet', data)
            dispatch(changeLevel(1000 * data.b_a))
            if(level % 10 === 0){
                dispatch(showLevel())
            }
            dispatch({ type: NEXT_BET, payload: null })
            return 
        }
        const amount = getState().amount.amount
        const autoCashAmount = getState().crash.autoCashAmount
        const autoCash = getState().crash.autoCash
        if(autoCash){
            if(+autoCashAmount < 1){
                dispatch(showError({text: 'incorrectX', translate: true}))
            } else {
                dispatch(changeLevel(1000 * +amount))
                if(level % 10 === 0){
                    dispatch(showLevel())
                }
                socket.emit('crashBet', { b_a: +amount, a_c: +autoCashAmount })
            }
        } else {
            dispatch(changeLevel(1000 * +amount))
            if(level % 10 === 0){
                dispatch(showLevel())
            }
            socket.emit('crashBet', { b_a: +amount, a_c: null })
        }
    }
}

export function crashCashOutHandler () {
    return async (dispatch, getState) => {
        const bets = getState().crash.bets
        if(bets.length){
            socket.emit('crashCashout', {b_a: bets[0].b_a, a_c: bets[0].a_c})
        }
    }
}

export function crashCleaner() {
    return async (_, getState) => {
        const interval = getState().crash.interval
        const timeout = getState().crash.timeout
        clearInterval(interval)
        clearTimeout(timeout)
    }
}

export function changeBankroll(data){
    return {
        type: CHANGE_BANKROLL,
        payload: data
    }
}

export function addBet(data) {
    return {
        type: ADD_BET,
        payload: data
    }
}

export function nextBetHandler () {
    return async (dispatch, getState) => {
        const amount = getState().amount.amount
        const autoCashAmount = getState().crash.autoCashAmount
        const autoCash = getState().crash.autoCash
        if(autoCash){
            if(+autoCashAmount < 1){
                dispatch(showError({text: 'incorrectX', translate: true}))
            } else {
                dispatch({ type: NEXT_BET, payload: { b_a: +amount, a_c: +autoCashAmount } })
            }
        } else {
            dispatch({ type: NEXT_BET, payload: { b_a: +amount, a_c: null } })
        }
    }
}

export function roundStarting(stage, timeLeft) {
    return async (dispatch, getState) => {
        let interval = getState().crash.interval
        clearInterval(interval)

        dispatch({type: INTERVAL, payload: setInterval(() => {
            const miliseconds = timeLeft % 1000
            const seconds = (timeLeft - miliseconds) / 1000
            if (stage === 0) {
                dispatch({type: CHANGE_TITLE, payload: "Next round in " + (seconds) + "." + miliseconds.toString().slice(0, 1) + "s"})
            } else if (stage === 1) {
                // dispatch({type: CHANGE_TITLE, payload: "Rolling in " + (seconds) + "." + miliseconds.toString().slice(0, 1) + "s"})
                dispatch({type: CHANGE_TITLE, payload: "Rising"})
            } else {
                dispatch({type: CHANGE_TITLE, payload: "Spinning " + (seconds) + "." + miliseconds.toString().slice(0, 1) + "s"})
            }
            timeLeft -= 100
        }, 100)})
    }
}


// roullete

export function getRoulleteHandler(){
    return async (dispatch, getState) => {
        try {
            const user = getState().app.user
            const response = await Promise.all([getRoullete(), getRoulletePrevious()])
            if (response[0].success){
                dispatch({type: GET_ROULLETE, payload: { roullete: response[0].data, user } })
                dispatch(setAmount(response[0].data))


                // this timing
                const roullete = response[0].data 
                let time = new Date() - new Date(roullete.start) 

                let timeLeft
                if (roullete.stage === 0) {
                    timeLeft = roullete.preparingStage - time - 3000
                } else if (roullete.stage === 1) {
                    time -= roullete.preparingStage
                    timeLeft = roullete.bettingStage - (time + 2400) //3400
                } else {
                    time -= roullete.preparingStage
                    time -= roullete.bettingStage
                    timeLeft = roullete.spinningStage - (time + 2200) // 3200
                    setTimeout(() => {
                        dispatch(roundRoulleteStarting(0, roullete.preparingStage))
                    }, timeLeft)
                }
                dispatch(roundRoulleteStarting(roullete.stage, timeLeft))
                //
            } else {
                dispatch(showError({text: response[0].msg, translate: false}))
            }
            if (response[1].success){
                dispatch({type: GET_ROULLETE_PREVIOUS, payload: response[1].data.rounds })
            } else {
                dispatch(showError({text: response[1].msg, translate: false}))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}




export function roundRoulleteStarting(stage, timeLeft) {
    return async (dispatch, getState) => {
        const interval = getState().roullete.interval
        clearInterval(interval)
        dispatch({ type: ROULLETE_INTERVAL , payload: setInterval(() => {
            let miliseconds = timeLeft % 1000
            let seconds = (timeLeft - miliseconds) / 1000
            if(miliseconds < 0){
                miliseconds = 0
            }
            if(seconds < 0){
                seconds = 0
            }
            if (stage === 0) {
                dispatch({ type: ROULLETE_SECONDS, payload: "Next round in " + seconds + "." + (miliseconds).toString().slice(0, 1) + "s" })
            } else if (stage === 1) {
                dispatch({ type: ROULLETE_SECONDS, payload: "Spinning in " + (seconds) + "." + (miliseconds).toString().slice(0, 1) + "s" })
            } else {
                dispatch({ type: ROULLETE_SECONDS, payload: "Spinning" })
            }
            timeLeft -= 100
        }, 100)})
    }
}

export function addRoulleteRound(data){
    return {
        type: ADD_ROULLETE_ROUND,
        payload: data
    }
}

export function roulleteCleaner() {
    return async (dispatch, getState) => {
        const interval = getState().roullete.interval
        clearInterval(interval)
        dispatch({ type: CLEAN_ROLLETE })
    }
}

export function roulleteBetHandler (color) {
    return async (dispatch, getState) => {
        const amount = getState().amount.amount
        const level = getState().app.user.level
        socket.emit('rouletteBet', { c: color, b_a: +amount })
        dispatch(changeLevel(1000 * +amount))
        if(level % 10 === 0){
            dispatch(showLevel())
        }
    }
}

export function changeMuteRoullete() {
    return async (dispatch, getState) => {
        const mute = getState().roullete.mute
        localStorage.setItem('muteRoullete', !mute)
        dispatch({ type: MUTE_ROULLETE })
    }
} 

// streetrace

export function getStreetraceHandler(){
    return async (dispatch, getState) => {
        try {
            const user = getState().app.user
            const response = await Promise.all([getStreetrace(), getStreetracePrevious()])
            if (response[0].success){
                dispatch({type: GET_STREETRACE, payload: { streetrace: response[0].data, user } })
                dispatch(setAmount(response[0].data))


                // this timing
                const streetrace = response[0].data 
                let time = new Date() - new Date(streetrace.start) 

                let timeLeft
                if (streetrace.stage === 0) {
                    timeLeft = streetrace.preparingStage - time - 3000
                } else if (streetrace.stage === 1) {
                    time -= streetrace.preparingStage
                    timeLeft = streetrace.bettingStage - (time + 1000)
                } else {
                    time -= streetrace.preparingStage
                    time -= streetrace.bettingStage
                    timeLeft = streetrace.spinningStage - (time + 2200) // 3200
                    setTimeout(() => {
                        dispatch({ type: SET_STREETRACE_STAGE, payload : 0 })
                        dispatch(roundStreetraceStarting(0, streetrace.preparingStage, true))
                    }, timeLeft)
                }
                dispatch(roundStreetraceStarting(streetrace.stage, timeLeft, true))
                
            } else {
                dispatch(showError({text: response[0].msg, translate: false}))
            }
            if (response[1].success){
                dispatch({type: GET_STREETRACE_PREVIOUS, payload: response[1].data.rounds })
            } else {
                dispatch(showError({text: response[1].msg, translate: false}))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function roundStreetraceStarting(stage, timeLeft, load = false) {
    return async (dispatch, getState) => {
        const interval = getState().streetrace.interval
        clearInterval(interval)
        dispatch({ type: STREETRACE_INTERVAL , payload: setInterval(() => {
            let miliseconds = timeLeft % 1000
            let seconds = (timeLeft - miliseconds) / 1000
            if(miliseconds < 0){
                miliseconds = 0
            }
            if(seconds < 0){
                seconds = 0
            }
            if (stage === 0) {
                dispatch({ type: STREETRACE_SECONDS, payload: "Next round in " + seconds + "." + (miliseconds).toString().slice(0, 1) + "s" })
            } else if (stage === 1) {
                dispatch({ type: STREETRACE_SECONDS, payload: "Race in " + (seconds) + "." + (miliseconds).toString().slice(0, 1) + "s" })
            } else {
                if(load){
                    dispatch({ type: STREETRACE_SECONDS, payload: "Preparation" })
                    return
                }
                dispatch({ type: STREETRACE_SECONDS, payload: "Race" })
            }
            timeLeft -= 100
        }, 100)})
    }
}

export function addStreetraceRound(data){
    return {
        type: ADD_STREETRACE_ROUND,
        payload: data
    }
}

export function streetraceCleaner() {
    return async (dispatch, getState) => {
        const interval = getState().streetrace.interval
        clearInterval(interval)
        dispatch({ type: CLEAN_STREETRACE })
    }
}

export function streetraceBetHandler (car) {
    return async (dispatch, getState) => {
        const amount = getState().amount.amount
        const level = getState().app.user.level
        socket.emit('streetraceBet', { c: car, b_a: +amount })
        dispatch(changeLevel(1000 * +amount))
        if(level % 10 === 0){
            dispatch(showLevel())
        }
    }
}

export function changeMuteStreetrace() {
    return async (dispatch, getState) => {
        const mute = getState().streetrace.mute
        localStorage.setItem('muteStreetrace', !mute)
        dispatch({ type: MUTE_STREETRACE })
    }
} 


// tot

export function getTotHandler() {
    return async dispatch => {
        try {
            const response = await Promise.all([getTot(), getTotRewards()])
            if(response[0].success && response[1].success){
                dispatch({ type: GET_TOT, payload: response[0].data })
                dispatch({ type: GET_TOT_REWARDS, payload: response[1].data })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function changeSelected(value) {
    return {
        type: CHANGE_SELECTED,
        payload: value
    }
}

// withdraw

export function getWithdrawHandler(select, concat = false, block = true) {
    return async (dispatch, getState) => {
        try {
            const loading = getState().withdraw.loading
            const offset = getState().withdraw.offset
            const skins = getState().withdraw.skins
            if(!loading || !block){
                dispatch({ type: CHANGE_LOADING, payload: true })
                const filter = getState().withdraw.filter
                let searchString = ''
                if(filter.search.trim().length){
                    searchString = '&search=' + filter.search.trim()
                }
                if(filter.min.trim().length){
                    searchString = searchString.concat('&min_price=' + (+filter.min.trim() * 1000))
                }
                if(filter.max.trim().length){
                    searchString = searchString.concat('&max_price=' +(+filter.max.trim() * 1000))
                }
                if(filter.order){
                    let order = select.find(item => item.id === filter.order)
                    // console.log(order)
                    if(order && order.data !== 'default'){
                        searchString = searchString.concat('&order_by=' + order.data)
                        if(order.subdata){
                            searchString = searchString.concat('&order=' + order.subdata)
                        }
                    }
                }

                const response = await Promise.all([ getWithdraw (searchString + '&offset=' + (concat ? offset + 100 : 0)) ].concat(concat || skins.length ? [] : checkWithdraw()))
                if(response[0].success){
                    dispatch({ type: concat ? LOAD_WITHDRAW : GET_SKINS, payload: response[0].items.map(elem => ({ ...elem, price:  +(elem.price / 1000).toFixed(2) })).reduce((unique, o) => {
                        if(!unique.some(obj => obj.name === o.name && obj.price === o.price)) {
                            unique.push(o);
                        }
                        return unique;
                    },[]) })
                    dispatch({ type: CHANGE_LOADING, payload: false })
                    if(concat){
                        dispatch({ type: CHANGE_OFFSET })
                    } else {
                        dispatch({ type: CHANGE_OFFSET, payload: true })
                    }
                } else {
                    dispatch(showError({text: response[0].msg, translate: false}))
                    dispatch({ type: CHANGE_LOADING, payload: false })
                }
                if(response[1]){
                    if(response[1].success){
                        dispatch({ type: GET_WITHDRAW, payload: response[1].data })
                    } else {
                        dispatch(showError({text: response[1].msg, translate: false}))
                    }
                }
            } else {
                return false
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
            dispatch({ type: CHANGE_LOADING, payload: false })
        }
    }
}

export function changeOrder(id){
    return {
        type: CHANGE_ORDER,   
        payload: id
    }
}

export function changeSearch(value){
    return {
        type: CHANGE_SEARCH,   
        payload: value
    }
}

export function changeMin(value){
    return {
        type: CHANGE_MIN,   
        payload: value
    }
}

export function changeMax(value){
    return {
        type: CHANGE_MAX,   
        payload: value
    }
}

export function setSelected(item){
    return async (dispatch, getState) => {
        if(item === null){
            return false
        }
        if(item === 'clear'){
            dispatch({ type: CLEAR_SELECTED })
            return false
        }
        const selectedPrice = getState().withdraw.selectedPrice
        const selected = getState().withdraw.selected
        const balance = getState().app.user.walletsBalance[0].amount
        if((selectedPrice + item.price > balance) && !selected.find(elem => elem.item_id === item.item_id)){
            dispatch(showError({text: 'select', translate: true}))
            return false
        }
        dispatch({ type: SET_SELECTED, payload: item })
    }
}

export function outWithdrawHandler(id, price){
    return async (dispatch) => {
        try {
            const response = await outWithdraw({ withdraw: id })
            if(response.success){
                dispatch({ type: ADD_WITHDRAW, payload: response.data })
                dispatch({ type: UPDATE_BALANCE, payload: price * -1 })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function deleteWithdraw(withdraw) {
    return async (dispatch, getState) => {
        const withdrawItem = getState().withdraw.withdraw.find(item => item.transaction_id === withdraw.i)
        if(withdrawItem){
            if(withdraw.s === 3) {
                dispatch({ type: UPDATE_BALANCE, payload: withdrawItem.price })
            } 
            dispatch({ type: DELETE_WITHDRAW, payload: withdraw })
        }
    }
}


// profile

export function getProfileHandler(id){
    return async (dispatch, getState) => {
        try {
            const user = getState().app.user
            if(user?.steamId === id){
                let response = await getAccount()
                dispatch({ type: GET_PROFILE, payload: { ...response.data, isMe: true } })
                return 
            }
            const response = await getProfile(id)
            if(response.success){
                dispatch({ type: GET_PROFILE, payload: response.data })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (e) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function getProfileRewardsHandler(){
    return async dispatch => {
        try {
            const response = await getProfileRewards()
            if(response.success){
                dispatch({ type: GET_PROFILE_REWARDS, payload: response.data })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (e) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function reverseReward(id){
    return {
        type: REVERSE_REWARD,
        payload: id
    }
}

export function openReward(id){
    return {
        type: OPEN_REWARD,
        payload: id
    }
}

export function claimRewardHandler(id){
    return async dispatch => {
        try {
            const response = await claimRewards(id)
            if(response.success){
                dispatch({ type: OPEN_REWARD, payload: id })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (e) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

// hangars

export function getHangarsHandler () {
    return async dispatch => {
        try {
            const response = await getHangars()
            if(response.success){
                dispatch({ type: GET_HANGARS, payload: response.data })
            } else {
                dispatch(showError({text: response.msg, translate: false}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function openHangarsHandler (level) {
    return async dispatch => {
        try {
            const response = await openHangar(level)
            if(response.success){
                dispatch({ type: OPEN_HANGAR, payload: { level, amount: response.data.amount } })
                return true
            } else {
                dispatch(showError({text: response.msg, translate: false}))
                return false
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
            return false
        }
    }
}

export function clearHangar() {
    return {
        type: CLEAR_OPEN_RESULT
    }
}

// popups

export function showTicketCreatePopup(){
    return { type: SHOW_TICKET_CREATE }
}

export function hideTicketCreatePopup(){
    return async dispatch => {
        dispatch({ type: HIDE_TICKET_CREATE })
        dispatch(clearTicketCreatePopup())
    }
}

export function changeTicketCreatedPopup(id = ''){
    return async dispatch => {
        dispatch({ type: SHOW_TICKET_CREATED, payload: id })
        setTimeout(() => {
            dispatch({ type: HIDE_TICKET_CREATED })
        }, 1500)
    }
}

export function showRoundDetail(id, handler){
    return async dispatch => {
        try {
            const response = await handler(id)
            if(response.success){
                dispatch({ type: SHOW_ROUND_DETAIL, payload: response.data })
            } else {
                dispatch(showError({text: response.msg, translate: true}))
            }
        } catch (error){
            dispatch(showError({text: error.message, translate: true}))
        }
    }
}

export function hideRoundDetail(){
    return {
        type: HIDE_ROUND_DETAIL
    }
}

export function showChatRules(){
    return {
        type: SHOW_CHAT_RULES
    }
}


export function hideChatRules(){
    return {
        type: HIDE_CHAT_RULES
    }
}

export function showStreetraceInfo(){
    return {
        type: SHOW_STREETRACE_INFO
    }
}

export function hideLevel(){
    return {
        type: HIDE_LEVEL
    }
}

export function showLevel(){
    return {
        type: SHOW_LEVEL
    }
}


export function hideStreetraceInfo(){
    return {
        type: HIDE_STREETRACE_INFO
    }
}

export function showFreeInfo(){
    return {
        type: SHOW_FREE_INFO
    }
}


export function hideFreeInfo(){
    return {
        type: HIDE_FREE_INFO
    }
}

export function showMute(id){
    return {
        type: SHOW_MUTE,
        payload: {
            mute: id,
            hours: 1
        }
    }
}

export function hideMute(){
    return {
        type: HIDE_MUTE
    }
}

export function showTrade(id){
    return async (dispatch, getState) => {
        const trade = getState().withdraw.withdraw.find(item => item.transaction_id === id)
        if(trade){
            dispatch({ type: SHOW_TRADE, payload: trade })
        }
    }
}

export function hideTrade(){
    return {
        type: HIDE_TRADE
    }
}


export function changeMuteHours(value){
    let hours = value.replace(/[^\d]/ig, '')
    if(hours > 168) {
        hours = 168
    }
    return {
        type: CHANGE_MUTE_HOURS,
        payload: hours
    }
}

export function hideDeposit() {
    return {
        type: HIDE_DEPOSIT
    }
}

export function showDeposit() {
    return {
        type: SHOW_DEPOSIT
    }
}

export function changeDepositMethod (method, minSumm) {
    return {
        type: CHANGE_DEPOSIT_METHOD,
        payload : {
            method,
            minSumm
        }
    }
}

export function changeDepositAmount (value) {
    return {
        type: CHANGE_DEPOSIT_AMOUNT,
        payload: value
    }
}

export function getDeposit() {
    return async dispatch => {
        try {
            const response = await Promise.all([depositCoinbase()])
            if(response[0].success){
                dispatch({ type: GET_DEPOSIT, payload: { coinbaseId: response[0].data.id } })
            } else {
                dispatch(showError({text: response[0].msg, translate: true}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function referralCodeHandler(code){
    return async (dispatch, getState) => {
        const lang = getState().app.user.language
        const depositAmount = getState().deposit.amount
        try {
            const response = await referralCode(code)
            if(response.success){
                dispatch(showError({text: lang === 'en' ? `You have successfully used code ${code} and will receive +${(100*(response.data.bonus-1)).toFixed(2)}% upon your deposit` : `Вы успешно использовали код ${code} и получите +${(100*(response.data.bonus-1)).toFixed(2)}% к вашему депозиту`, translate: false, success: true}))
                dispatch({ type: BONUS , payload: response.data.bonus })
                if(+depositAmount){
                    dispatch(changeDepositAmount(+depositAmount * response.data.bonus))
                }
            } else {
                dispatch(showError({text: response.msg, translate: true}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}

export function depositPay (amount, type = 'freekassa') {
    return async dispatch => {
        try {
            const response = type === 'qiwi' ? await depositQiwi({amount: +((+amount).toFixed(2))}) : type === 'skins' ? await depositSkins() : await depositFreekassa({amount: +((+amount).toFixed(2))})
            if(response.success){
                window.location.href = response.data.link
            } else {
                dispatch(showError({text: response.msg, translate: true}))
            }
        } catch (error) {
            dispatch(showError({text: error.message, translate: false}))
        }
    }
}


export function showDepositFailed () {
    return {
        type: SHOW_DEPOSIT_FAILED
    }
}

export function hideDepositFailed () {
    return {
        type: HIDE_DEPOSIT_FAILED
    }
}

export function showDepositSuccess () {
    return {
        type: SHOW_DEPOSIT_SUCCESS
    }
}

export function hideDepositSuccess () {
    return {
        type: HIDE_DEPOSIT_SUCCESS
    }
}

export function showOld () {
    return {
        type: SHOW_OLD
    }
}

export function hideOld () {
    return {
        type: HIDE_OLD
    }
}

export function changeOld () {
    return async (dispatch, getState) => {
        const old = getState().app.old
        localStorage.setItem('old', !old)
        dispatch({type: OLD, payload: !old })
    }
}


export function showMobileChat () {
    return {
        type: SHOW_MOBILE_CHAT
    }
}

export function hideMobileChat () {
    return {
        type: HIDE_MOBILE_CHAT
    }
}

export function showMobileMenu () {
    return {
        type: SHOW_MOBILE_MENU
    }
}

export function hideMobileMenu () {
    return {
        type: HIDE_MOBILE_MENU
    }
}

export function showMobileNotification () {
    return {
        type: SHOW_MOBILE_NOTIFICATION
    }
}

export function hideMobileNotification () {
    return {
        type: HIDE_MOBILE_NOTIFICATION
    }
}

export function showMobileWithdraws () {
    return {
        type: SHOW_MOBILE_WITHDRAWS
    }
}

export function hideMobileWithdraws () {
    return {
        type: HIDE_MOBILE_WITHDRAWS
    }
}

// export function acceptTosHandler(){
//     return async dispatch => {
//         try {
//             const response = await acceptTos()
//             if(response.success){
//                 // dispatch(hideAccept())
//             } else {
//                 dispatch(showError({text: response.msg, translate: false}))
//             }
//         } catch (error) {
//             dispatch(showError({text: error.message, translate: false}))
//         }
//     }
// }