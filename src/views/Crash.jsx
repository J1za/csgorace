import React, { useEffect, useState } from 'react'



import { Link } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { changeAutoCash, crashBetHandler, crashCashOutHandler, crashCleaner, getCrashHandler, inputAmount, inputAutoCash, nextBetHandler, showRoundDetail } from '../redux/actions'
import { getCrashRound } from '../utilites/api' 


import ButtonYellow from '../components/ButtonYellow'
import CrashAnimate from '../components/CrashAnimate'
import Hash from '../components/Hash'
import GameNav from '../components/GameNav'
import GameHeader from '../components/GameHeader'

import { useTranslation } from 'react-i18next'

import { ReactComponent as Fuel } from '../assets/fuel.svg'
import { ReactComponent as Controller } from '../assets/controller.svg'

import './Crash.scss'

export default function Crash(){

    const { t } = useTranslation(['crash', 'main'])

    const dispatch = useDispatch()

    const [earnings, setEarnings] = useState(0)


    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)
    const rates = useSelector(state => state.amount.rates)
    const amount = useSelector(state => state.amount.amount)

    const crash = useSelector(state => state.crash.crash)
    const previous = useSelector(state => state.crash.previous)
    const autoCash = useSelector(state => state.crash.autoCash)
    const autoCashAmount = useSelector(state => state.crash.autoCashAmount)
    const bankroll = useSelector(state => state.crash.bankroll)
    const stage = useSelector(state => state.crash.stage)
    const bets = useSelector(state => state.crash.bets.length)
    const bet = useSelector(state => state.crash.bets[0])
    const nextBet = useSelector(state => state.crash.nextBet)
    const x = useSelector(state => state.crash.x)
    const title = useSelector(state => state.crash.title)
    const betsAll = useSelector(state => state.crash.betsAll)



    useEffect(() => {
        dispatch(getCrashHandler())
        return () => dispatch(crashCleaner())
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(bet){
            setEarnings(+(bet.b_a * (x || 1)).toFixed(2))
        } else {
            setEarnings('-')
        }
         //eslint-disable-next-line
    }, [bet, x])

    useEffect(() => {
        if(stage === 1 && nextBet){
            dispatch(crashBetHandler(nextBet))
        }
         //eslint-disable-next-line
    }, [stage])

    return (
        <div className="crash">
            <GameNav/>
            <GameHeader title={t('crash:crash')} icon={<Controller/>} timer={title} bankroll={bankroll}/>
            <div className="crash-recent">
                <div className={"recent-header "}>{t('crash:recent')}</div>
                <ul className="recent-body">{previous.map(round => <li className={'recent-body-item ' + (round.X < 1.5 ? 'grey' : round.X < 3 ? 'lime' : round.X < 9 ? 'blue' : round.X < 20 ? 'violet' : 'gold')} key={round.roundId} onClick={() => dispatch(showRoundDetail(round.roundId, id => getCrashRound(id)))}>{round.X}x</li> )}</ul>
            </div>
            <CrashAnimate/>
            <div className="crash-bets">
                <div className="bet-amount">
                    <span>{t('crash:betAmount')}</span>
                    <input type="text" value={amount} disabled={!user} step="0.01" min="0.01" onChange={event => dispatch(inputAmount(event.target.value))} />
                    <div className="minmax-bets">
                        <span>{t('crash:maxBet')}: <span>{crash?.maxBet}</span></span>
                        <span>{t('crash:maxWin')}: <span>{crash?.maxPayout}</span></span>
                    </div>
                </div>
                <div className="autocash-out">
                    <div className="bets-header">
                        <span>{t('crash:autoCash')}</span>
                        <div className={"turn " + (autoCash && user ? 'active' : '')} onClick={() => user ? dispatch(changeAutoCash()) : false}> 
                            <span className="turn-title">{autoCash && user  ? t('main:on') : t('main:off')}</span> 
                            <div className="turn-thumb"><span></span></div>
                        </div>
                    </div>
                    <input type="text" disabled={!autoCash || !user} step="0.01" min="0.01" value={autoCash && user ? autoCashAmount : ''} onChange={event => dispatch(inputAutoCash(event.target.value)) } />
                </div>
                <div className="crash-rates-mobile">
                    <div className="crash-rates-body">
                        <ul className="crash-rates-body-list">
                            {rates.map(item => <li key={item.id} onClick={() => user ? dispatch({type: item.do }) : false} >{item.name}</li> )}
                        </ul>
                        <div className="crash-rates-body-clear" onClick={() => dispatch(inputAmount(''))}>{t('roullete:clear')}</div>
                    </div>
                    <div className="crash-rates-earnings">
                        {t('crash:earnings')}: &nbsp;<span> {earnings}</span>
                    </div>
                </div>
                <ButtonYellow
                    className="place-bet" 
                    disabled={!user || stage === 0 || (stage === 1 && bets >= 1) || (stage === 2 && bets === 0 && nextBet)}
                    handler={() => stage === 1 ? dispatch(crashBetHandler()) : stage === 2 && !bets ? dispatch(nextBetHandler()) : dispatch(crashCashOutHandler())}
                >{stage === 2 && bets ? t('crash:cashOut') : t('crash:placeBet')}</ButtonYellow>
            </div>
            <div className="crash-rates">
                <div className="crash-rates-body">
                    <ul className="crash-rates-body-list">
                        {rates.map(item => <li key={item.id} onClick={() => user ? dispatch({type: item.do }) : false} >{item.name}</li> )}
                    </ul>
                    <div className="crash-rates-body-clear" onClick={() => dispatch(inputAmount(''))}>{t('roullete:clear')}</div>
                </div>
                <div className="crash-rates-earnings">
                    {t('crash:earnings')}: &nbsp;<span> {earnings}</span>
                </div>
            </div>
            <ul className="crash-table">
                <li className="header">
                    <span>{t('crash:table.player')}</span>
                    <span>{t('crash:table.cashedOut')}</span>
                    <span>{t('crash:table.bet')}</span>
                    <span>{t('crash:table.earnings')}</span>
                </li>
                {betsAll.map((bet, index) => <li className={'user ' + (user?.steamId === bet.s_i ? 'is-me' : '')} key={index}>
                    <div className="user-data">
                        <Link to={"/profile/" + bet.s_i} className={(bet.l < 10 ? 'grey' : bet.l < 20 ? 'blue' : bet.l < 40 ? 'yellow' : bet.l < 60 ? 'orange' : bet.l < 80 ? 'violet' : bet.l < 90 ? 'red' : bet.l <= 100 ? 'fire' : '' )}><img className={streamer && user?.steamId !== bet.s_i ? 'streamer' : ''} src={bet.a} alt="" /></Link>
                        <span>{streamer && user?.steamId !== bet.s_i ? '*'.repeat(bet.u.length) : bet.u}</span>
                        <div className={"level "  + (bet.l < 10 ? 'grey' : bet.l < 20 ? 'blue' : bet.l < 40 ? 'yellow' : bet.l < 60 ? 'orange' : bet.l < 80 ? 'violet' : bet.l < 90 ? 'red' : bet.l <= 100 ? 'fire' : '' )}>{bet.l}</div>
                    </div>
                    <div className={"user-cashout " + (stage === 0 && !bet.c ? 'red' : '')}>{window.innerWidth < 1024 ? <span>{t('crash:table.cashedOut')}</span> : ''}{bet.c || '\u2014'}</div>
                    <div className="user-bet">{window.innerWidth < 1024 ? <span>{t('crash:table.bet')}</span> : ''} <Fuel/> {bet.b_a}</div>
                    <div className={"user-earnings " + (stage === 0 && !bet.c ? 'red' : '')}>{window.innerWidth < 1024 ? <span>{t('crash:table.earnings')}</span> : ''}<Fuel/> {bet.c ? (bet.w - bet.b_a > crash.maxPayout ? crash.maxPayout : bet.w - bet.b_a).toFixed(2) : (stage === 0 ? (0 - bet.b_a).toFixed(2) : '\u2014')}</div>
                </li>)}
            </ul>
            <Hash hash={crash?.previousHash}/>
        </div>
        //<CrashChart/>
    )
}