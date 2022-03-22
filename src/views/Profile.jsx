import React, { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'
import { changeApiKeyHandler, changeStreamer, changeTradeUrlHandler, getProfileHandler, getProfileResultsHandler, sendCodeHandler, showRoundDetail } from '../redux/actions'
import { CHANGE_RESULTS_OFFSET } from '../redux/types'
import { date } from '../utilites/functions'
import { getCrashRound, getRaceRound, getRoulleteRound, getStreetraceRound } from '../utilites/api'

import ProfileRewards from '../components/ProfileRewards'

import { ReactComponent as Fuel } from '../assets/fuel.svg'
import { ReactComponent as Stream } from '../assets/stream.svg'
import { ReactComponent as Steam } from '../assets/steam-copy.svg'
import { ReactComponent as LinkSvg } from '../assets/link.svg'


import winrate from '../assets/winrate.png'
import totalBet from '../assets/total-bet.png'
import totalWith from '../assets/total-with.png'



import Car1 from '../assets/level/1.svg'
import Car2 from '../assets/level/2.svg'
import Car3 from '../assets/level/3.svg'
import Car4 from '../assets/level/4.svg'
import Car5 from '../assets/level/5.svg'
import Car6 from '../assets/level/6.svg'
import Car7 from '../assets/level/7.svg'
// import Car8 from '../assets/level/8.png'
// import Car9 from '../assets/level/9.png'
// import Car10 from '../assets/level/10.png'
// import Car11 from '../assets/level/11.png'
// import Car12 from '../assets/level/12.png'
// import Car13 from '../assets/level/13.png'

// import Balance from '../assets/mobile-acc.png'

import './Profile.scss'
// import ButtonYellow from '../components/ButtonYellow'

export default function Profile(){

    const [ code, setCode ] = useState('')
    const [ tradeUrl, setTradeUrl ] = useState('')
    const [ apiKey, setApiKey ] = useState('')
    const [ results, setResults ] = useState('roulette')

    const { t } = useTranslation(['profile'])
    const { id } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const router = useHistory()

    const profile = useSelector(state => state.profile.profile)
    const codeWon = useSelector(state => state.profile.codeWon)
    const resultsData = useSelector(state => state.profile.results)
    const loading = useSelector(state => state.profile.loading)
    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)

    const last = useRef()


    const scroll = () => {
        if(last.current && !loading){
            if(window.innerHeight > last.current.getBoundingClientRect().top - 200){
                setResults( prev => {
                    dispatch(getProfileResultsHandler(prev, true))
                    return prev
                } )
            }
        }
    }

    useEffect(() => {
        dispatch(getProfileHandler(id))
        //eslint-disable-next-line
    }, [location])

    useEffect(() => {
        dispatch({ type: CHANGE_RESULTS_OFFSET, payload: true })
        if(profile && id === profile.steamId){
            setTradeUrl(profile.steamTradeURL)
            setApiKey(profile.steamApiKey)
            dispatch(getProfileResultsHandler(results, false))
        }
        //eslint-disable-next-line
    }, [results, profile])

    useEffect(() => {
        dispatch(getProfileHandler(id))
        window.addEventListener('wheel', scroll)
        return () => window.removeEventListener('wheel', scroll)
        //eslint-disable-next-line
    }, [])

    if(!profile) return false

    return (

        <div className="profile">
            <div className="profile-header">
                <h1>{t('profile:profile')}</h1>
                { profile.isMe && profile.permissions.status > 1 ? <div className="profile-header-streamer">
                    <Stream/>
                    <span onClick={() => router.push('/streamer')}>{t('profile:stream')}</span>
                    <div className={"switch " + (streamer ? 'active' : '')} onClick={() => dispatch(changeStreamer())}>
                        <span></span>
                    </div>
                </div> : '' }
            </div>
            <div className="profile-account">
                <div className="account-data">
                    <div className={"image "  +  (profile.level < 10 ? 'grey' : profile.level < 20 ? 'blue' : profile.level < 40 ? 'yellow' : profile.level < 60 ? 'orange' : profile.level < 80 ? 'violet' : profile.level < 90 ? 'red' : profile.level <= 100 ? 'fire' : '' )}>
                        <img src={profile.profileAvatar} alt="" className={"user-image " + (streamer ? 'streamer' : '')} /> 
                        <div className={"level " +  (profile.level < 10 ? 'grey' : profile.level < 20 ? 'blue' : profile.level < 40 ? 'yellow' : profile.level < 60 ? 'orange' : profile.level < 80 ? 'violet' : profile.level < 90 ? 'red' : profile.level <= 100 ? 'fire' : '' )}>{profile.level}</div> 
                    </div>
                    <div className="info">
                        <div className="info-name">{profile.nickname}</div>
                        <div className={"info-level " + (profile.level < 10 ? 'grey' : profile.level < 20 ? 'blue' : profile.level < 40 ? 'yellow' : profile.level < 60 ? 'orange' : profile.level < 80 ? 'violet' : profile.level < 90 ? 'red' : profile.level <= 100 ? 'fire' : '' )}>
                            <div className={"info-level-num "}>{profile.level}</div>
                            <div className="line-wrapper">
                                <div className="line" style={{width: profile.level === 100 ? '100%' : (profile.xp - (8000 * (Math.pow(1.11, profile.level) - 1) / (1.11 - 1))) / (8000 * Math.pow(1.11, profile.level) / 100) + "%"}}>
                                </div>
                                <div className="line-xp-value">{new Intl.NumberFormat('ru-RU').format(profile.level === 100 ? +(8000 * Math.pow(1.11, profile.level)).toFixed() : +(profile.xp - (8000 * (Math.pow(1.11, profile.level) - 1) / (1.11 - 1))).toFixed())}/{new Intl.NumberFormat('ru-RU').format(+(8000 * Math.pow(1.11, profile.level)).toFixed())}</div>
                            </div>
                            <div className="line-xp">XP</div>
                        </div>
                    </div>
                </div>
                {/* {profile.isMe ? <div className="account-nav">
                    <img src={Balance} alt="" className="account-nav-mobile-balance" />
                    <div className="account-nav-fuel">
                        <Fuel/>
                        <span>{profile.walletsBalance[0].amount}</span>
                    </div>
                    <div className="account-nav-btns">
                        <Link to="/withdraw" className="account-nav-cash">{t('profile:cashOut')}</Link>
                        <ButtonYellow onClick={() => dispatch(showDeposit())} className="account-nav-deposit">{t('profile:deposit')}</ButtonYellow>
                    </div>
                </div> : '' } */}
            </div>
            <div className={"profile-settings " + (!profile.isMe ? 'start' : "")}>
                {profile.isMe ? <div className="profile-settings-inputs">
                    <div className="input-wrapper">
                        <span>{t('profile:steam')}</span>
                        <div className="input-wrapper-nav">
                            <div className="input-content">
                                <a rel="noreferrer" href="https://steamcommunity.com/dev/apikey"  target="_blank"><Steam/></a>
                                <input type="text" className={streamer ? 'streamer' : ''} value={apiKey} onChange={event => {
                                    setApiKey(event.target.value)
                                }} />
                            </div>
                            <button className={"user-save-btn "} onClick={() => {
                                dispatch(changeApiKeyHandler(apiKey))
                            }}>{t('profile:save')}</button>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <span>{t('profile:trade')}</span>
                        <div className="input-wrapper-nav">
                            <div className="input-content">
                                <a rel="noreferrer" href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank"><LinkSvg/></a>
                                <input type="text" className={streamer ? 'streamer' : ''} value={tradeUrl} 
                                    onChange={event => {
                                        setTradeUrl(event.target.value)
                                        // if(/^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[\w-]{8}$/.test(event.target.value)){
                                        //     dispatch(changeTradeUrlHandler(event.target.value))
                                        // }
                                    }} 
                                />
                            </div>
                            <button className={"user-save-btn "} onClick={() => {
                                if(/^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[\w-]{8}$/.test(tradeUrl)){
                                    dispatch(changeTradeUrlHandler(tradeUrl))
                                }
                            }}>{t('profile:save')}</button>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <span>{t('profile:code')}</span>
                        <div className="input-wrapper-nav">
                            <div className="input-content">
                                <input type="text" value={code} onChange={event => setCode(event.target.value)} />
                            </div>
                            <button className="user-win" disabled={codeWon ? true : false} onClick={() => {
                                dispatch(sendCodeHandler(code))
                                .then(() => setCode(''))
                            }}>
                                {!codeWon ? <span>{t('profile:useCode')}</span> : (
                                    <>
                                        <span>+ {codeWon}</span>
                                        <Fuel/>
                                    </>
                                )}
                            </button> 
                        </div>
                    </div>
                </div> : '' }
                <div className="profile-settings-data-blocks">
                    <div className="profile-settings-winrate">
                        <span>{t('profile:winrate')}</span>
                        <div className="value">{((profile.totalWin / profile.totalBet * 100) === Infinity ? 0 : (profile.totalWin / profile.totalBet * 100)).toFixed(2).substring(0, 5)}%</div>
                        <img src={winrate} alt="" />
                    </div>
                    <div className="profile-settings-totalbet">
                        <span>{t('profile:total')}</span>
                        <div className="value">{profile.totalBet}</div>
                        <img src={totalBet} alt="" />
                    </div>
                    <div className="profile-settings-totalwith">
                        <span>{t('profile:totalWith')}</span>
                        <div className="value">{profile.totalWithdraw}</div>
                        <img src={totalWith} alt="" />
                    </div>
                </div>
            </div>
            <div className="profile-statistic">
                <div className="car">
                    <img className={'car-image'} src={( profile.level < 10 ? Car1 : profile.level < 20 ? Car2 : profile.level < 40 ? Car3 : profile.level < 60 ? Car4 : profile.level < 80 ? Car5 : profile.level < 90 ? Car6 : profile.level <= 100 ? Car7 : '' )} alt="" />
                    <div className="car-info">
                        <div className="car-info-username">{user?.language === 'en' ? `${profile.nickname}\`s car` : `Машина ${profile.nickname}`}</div>
                        <div className="car-info-percent">
                            <span>{(+(profile.xp - (8000 * (Math.pow(1.11, profile.level) - 1) / (1.11 - 1))).toFixed() / +(((8000 * Math.pow(1.11, profile.level)).toFixed()) / 100).toFixed(2)).toFixed(2)}%</span>
                            <div className="percent-line">
                                <div className="percent-line-value" style={{width: `${+(+(profile.xp - (8000 * (Math.pow(1.11, profile.level) - 1) / (1.11 - 1))).toFixed() / +(((8000 * Math.pow(1.11, profile.level)).toFixed()) / 100).toFixed(2)).toFixed(2)}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProfileRewards/>
            </div>
            <div className="profile-history">
                <div className="profile-history-title">{t('profile:history')}</div>
                <div className="profile-history-table">
                    <div className="table-header">
                        <div className={"table-header-item " + (results === 'streetrace' ? 'active' : '')} onClick={() => setResults('streetrace')}>{t('profile:table.streetrace')}</div>
                        <div className={"table-header-item " + (results === 'roulette' ? 'active' : '')} onClick={() => setResults('roulette')}>{t('profile:table.roullete')}</div>
                        <div className={"table-header-item " + (results === 'crash' ? 'active' : '')} onClick={() => setResults('crash')}>{t('profile:table.crash')}</div>
                        <div className={"table-header-item " + (results === 'race' ? 'active' : '')} onClick={() => setResults('race')}>{t('profile:table.race')}</div>
                        { profile.isMe ? <div className={"table-header-item " + (results === 'transactions' ? 'active' : '')} onClick={() => setResults('transactions')}>{t('profile:table.deposit')}</div> : '' }
                    </div>
                         <ul className="table-body">
                             {results === 'transactions' ? resultsData.map((transaction, index) => <li ref={index === resultsData.length - 1 ? last : null} key={index} className={'table-body-item'}>
                                     <div className={"result " + (transaction.status === 2 ? 'win' : transaction.status === 3 ? 'lose' : 'between')}></div>
                                     <div className="date">{date(transaction.moment, 'd') } ({transaction.service}) #{transaction.id}</div>
                                    <div className="value">{ transaction.type === 'D' ? '+' + (transaction.amountFuel || '') : '-' + (transaction.amountFuel || '')}</div>
                                     <Fuel/>
                                 </li> ) : resultsData.map((round, index) => round.players?.map((item, idx) => {
                                    let value = round.color ? +(round.color === item.c ? (item.c === 'Green' ? item.b_a * 14 - item.b_a : item.b_a * 2 - item.b_a) : item.b_a * -1 ).toFixed(2) : 
                                    round.X ? +(item.c ? item.c * item.b_a - item.b_a : item.b_a * -1).toFixed(2) : 
                                    round.winner ? +(item.s_i === round.winner ? item.w - item.b_a : item.b_a * -1 ).toFixed(2) : 
                                    round.car !== undefined ? +(round.car === item.c ? item.b_a * 3.75 - item.b_a : item.b_a * -1 ).toFixed(2) : ''
                                    let result = value > 0 ? 'win' : 'lose'
                                    if(value > 15000){
                                        value = 15000
                                    }
                                 return <li onClick={() => {
                                     if(results === 'roulette'){
                                         dispatch(showRoundDetail(round.roundId, id => getRoulleteRound(id)))
                                     } else if (results === 'crash'){
                                         dispatch(showRoundDetail(round.roundId, id => getCrashRound(id)))
                                     } else if (results === 'streetrace'){
                                         dispatch(showRoundDetail(round.roundId, id => getStreetraceRound(id)))
                                     } else if (results === 'race'){
                                         dispatch(showRoundDetail(round.roundId, id => getRaceRound(id)))
                                     }
                                 }} ref={index === resultsData.length - 1 && idx === round.players.length - 1 ? last : null} key={round.roundId + idx.toString()} className={'table-body-item'}>
                                     <div className={"result " + result}></div>
                                     <div className="date">{date(round.moment, 'd') }</div>
                                     <div className={"value "}>{value > 0 ? '+' + value : value}</div>
                                     <Fuel/>
                                 </li>
                            }) )}
                         </ul>
                     </div>
            </div>
        </div>
    )
}