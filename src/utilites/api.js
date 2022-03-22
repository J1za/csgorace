import axios from "axios";
import { store } from '../index'
import { showError } from "../redux/actions";

export const DOMAIN = 'https://csgorace.com/'
const ADMIN = 'https://admin.csgorace.com/'

const fetcher = axios.create({
    baseURL: 'https://api.csgorace.com/',
    params: {
        'key' : 'EN8REWcmyrKY3734'
    },
    // withCredentials: true
})

fetcher.interceptors.request.use(null, error => {
    store.dispatch(showError({text: error.message, translate: false}))
    return Promise.reject(error);
})

fetcher.interceptors.response.use(null, error => {
    store.dispatch(showError({text: error.message, translate: false}))
    return Promise.reject(error);
})

export async function getAccount (){
    return fetcher({
        method: 'get',
        url: '/account_details'       
    })
    .then(res => res.data)
}


export async function getServer (){
    return fetcher({
        method: 'get',
        url: '/get_server'       
    })
    .then(res => res.data)
}

// export async function acceptTos (){
//     return fetcher({
//         method: 'post',
//         url: `/accept_tos`,
//     })
//     .then(res => res.data)
// }

// chat
export async function getMessages (lang){
    return fetcher({
        method: 'get',
        url: `/get_messages?language=${lang}`       
    })
    .then(res => res.data)
}

export async function muteUser (data){
    return fetcher({
        method: 'post',
        url: `${ADMIN}mute_player`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}

export async function banUser (data){
    return fetcher({
        method: 'post',
        url: `${ADMIN}ban_player`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}

export async function getProfile (id) {
    return fetcher({
        method: 'get',
        url: `/get_user?steamId=${id}`       
    })
    .then(res => res.data) 
}

export async function getProfileRewards () {
    return fetcher({
        method: 'get',
        url: `${DOMAIN}free/get_achievements`       
    })
    .then(res => res.data) 
}

export async function claimRewards (id) {
    return fetcher({
        method: 'post',
        url: `${DOMAIN}free/claim_achievement`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify({ id })               
    })
    .then(res => res.data) 
}

export async function getRedeem () {
    return fetcher({
        method: 'get',
        url: `/referrals/redeem_profit`       
    })
    .then(res => res.data) 
}

export async function getRefferals () {
    return fetcher({
        method: 'get',
        url: `/referrals/get_referrals`       
    })
    .then(res => res.data) 
}

export async function editCode ( code ) {
    return fetcher({
        method: 'post',
        url: `/referrals/edit_code`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify({ code })        
    })
    .then(res => res.data) 
}

export async function getProfit () {
    return fetcher({
        method: 'get',
        url: `/referrals/get_referrals_profit`       
    })
    .then(res => res.data) 
}

export async function referralCode (code) {
    return fetcher({
        method: 'post',
        url: `/referrals/use_referral_code`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify({ code })   
    })
    .then(res => res.data) 
}

export async function sendCode(code) {
    return fetcher({
        method: 'post',
        url: `/use_promo`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify({ code })
    })
    .then(res => res.data)
}

export async function getProfileResults (game, id, offset){
    return fetcher({
        method: 'get',
        url: `/${game}/get_user_rounds?steamId=${id}&offset=${offset}`  
    })
    .then(res => res.data)
}

export async function getTransactions (offset){
    return fetcher({
        method: 'get',
        url: `/get_transactions?offset=${offset}`  
    })
    .then(res => res.data)
}

export async function changeTradeUrl (tradeURL){
    return fetcher({
        method: 'post',
        url: `/change_tradeurl`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify({ tradeURL })
    })
    .then(res => res.data)
}

export async function changeApiKey (apiKey){
    return fetcher({
        method: 'post',
        url: `/change_apikey`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify({ api: apiKey })
    })
    .then(res => res.data)
}

// tickets
export async function getTickets (){
    return fetcher({
        method: 'get',
        url: `${DOMAIN}support/get_tickets`       
    })
    .then(res => res.data)
} 


export async function getTicket (id){
    return fetcher({
        method: 'get',
        url: `${DOMAIN}support/get_ticket?id=${id}`       
    })
    .then(res => res.data)
}

export async function sendTicketMessage (data){
    return fetcher({
        method: 'post',
        url: `${DOMAIN}support/answer_ticket`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}

export async function closeTicket (data){
    return fetcher({
        method: 'post',
        url: `${DOMAIN}support/close_ticket`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}


export async function createTicket (data) {
    return fetcher({
        method: 'post',
        url: `${DOMAIN}support/create_ticket`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}

// tot

export async function getTot (){
    return fetcher({
        method: 'get',
        url: `/get_tot`  
    })
    .then(res => res.data)
}

export async function getTotRewards (){
    return fetcher({
        method: 'get',
        url: `/get_tot_rewards`  
    })
    .then(res => res.data)
}

// withdraw

export async function getWithdraw (search){
    return fetcher({
        method: 'get',
        url: `/withdraw/waxpeer/get_items?limit=100${search}`  
    })
    .then(res => res.data)
}

export async function outWithdraw (data){
    return fetcher({
        method: 'post',
        url: `/withdraw/waxpeer/withdraw`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}

export async function checkWithdraw (){
    return fetcher({
        method: 'get',
        url: `${DOMAIN}withdraw/waxpeer/check_withdrawals`
    })
    .then(res => res.data)
}

// race

export async function getRace (){
    return fetcher({
        method: 'get',
        url: `/get_race`  
    })
    .then(res => res.data)
}

export async function getRaceRound (id){
    return fetcher({
        method: 'get',
        url: `/race/round_data?roundId=${id}`  
    })
    .then(res => res.data)
}

// crash

export async function getCrash (){
    return fetcher({
        method: 'get',
        url: `/get_crash`  
    })
    .then(res => res.data)
}

export async function getCrashPrevious (){
    return fetcher({
        method: 'get',
        url: `/crash/get_previous_rounds`  
    })
    .then(res => res.data)
}

export async function getCrashRound (id){
    return fetcher({
        method: 'get',
        url: `/crash/round_data?roundId=${id}`  
    })
    .then(res => res.data)
}

// roullete

export async function getRoullete (){
    return fetcher({
        method: 'get',
        url: `/get_roulette`  
    })
    .then(res => res.data)
}

export async function getRoulletePrevious (){
    return fetcher({
        method: 'get',
        url: `/roulette/get_previous_rounds`  
    })
    .then(res => res.data)
}

export async function getRoulleteRound (id){
    return fetcher({
        method: 'get',
        url: `/roulette/round_data?roundId=${id}`  
    })
    .then(res => res.data)
}

// streetrace

export async function getStreetrace (){
    return fetcher({
        method: 'get',
        url: `/get_streetrace`  
    })
    .then(res => res.data)
}

export async function getStreetracePrevious (){
    return fetcher({
        method: 'get',
        url: `/streetrace/get_previous_rounds`  
    })
    .then(res => res.data)
}

export async function getStreetraceRound (id){
    return fetcher({
        method: 'get',
        url: `/streetrace/round_data?roundId=${id}`  
    })
    .then(res => res.data)
}

// hangar 

export async function getHangars (){
    return fetcher({
        method: 'get',
        url: `${DOMAIN}free/get_hangars`  
    })
    .then(res => res.data)
}

export async function openHangar(level){
    return fetcher({
        method: 'get',
        url: `${DOMAIN}free/open_hangar?level=${level}`  
    })
    .then(res => res.data)
}


// deposit 

export async function depositFreekassa (data) {
    return fetcher({
        method: 'post',
        url: `${DOMAIN}deposit/freekassa`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}

export async function depositQiwi (data) {
    return fetcher({
        method: 'post',
        url: `${DOMAIN}deposit/qiwi`,
        headers: {
            'content-type' : 'application/json'
        },
        data: JSON.stringify(data)
    })
    .then(res => res.data)
}

export async function depositCoinbase () {
    return fetcher({
        method: 'post',
        url: `${DOMAIN}deposit/coinbase`,
    })
    .then(res => res.data)
}

export async function depositSkins () {
    return fetcher({
        method: 'post',
        url: `${DOMAIN}deposit/skinsback`,
    })
    .then(res => res.data)
}

export async function getNotifications (){
    return fetcher({
        method: 'get',
        url: `/get_notifications`  
    })
    .then(res => res.data)
}

export default fetcher