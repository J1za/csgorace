import React, { useEffect } from 'react'

import GameNav from '../components/GameNav'
import GameHeader from '../components/GameHeader'
import GameAmount from '../components/GameAmount'


import RouletteBets from '../components/RouletteBets'
import Hash from '../components/Hash'
import RouletteAnimate from '../components/RouletteAnimate'
import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { changeMuteRoullete, getRoulleteHandler, inputAmount, roulleteCleaner, showRoundDetail } from '../redux/actions'



// import {ReactComponent as RoulleteItem } from '../assets/roullete.svg'
// import {ReactComponent as Mute } from '../assets/mute.svg'
// import {ReactComponent as Volume } from '../assets/volume.svg'
// import {ReactComponent as Fuel } from '../assets/fuel.svg'
import {ReactComponent as Controller } from '../assets/controller.svg'

import { getRoulleteRound } from '../utilites/api'


import './Roulette.scss'

//eslint-disable-next-line
export default () => {

    const dispatch = useDispatch()

    const rates = useSelector(state => state.amount.rates)
    const amount = useSelector(state => state.amount.amount)
    // const user = useSelector(state => state.app.user)

    const previous = useSelector(state => state.roullete.previous) 
    const roullete = useSelector(state => state.roullete.roullete) 
    const betsAll = useSelector(state => state.roullete.betsAll)
    const seconds = useSelector(state => state.roullete.seconds)
    const mute = useSelector(state => state.roullete.mute)
    const bankroll = useSelector(state =>  state.roullete.betsAll.reduce((counter, value) => counter + value.b_a, 0))

    const { t } = useTranslation(['roullete'])

    useEffect(() => {
        dispatch(getRoulleteHandler())
        return () => dispatch(roulleteCleaner())
        //eslint-disable-next-line
    }, [])

    return (
        <div className="roulette">
            <GameNav/>
            <GameHeader mute={mute} muteHandler={() => dispatch(changeMuteRoullete())} title={t('roullete:roullete')} icon={<Controller/>} timer={seconds} bankroll={bankroll}/>
            <div className="roulette-stat">
                <div className="roulette-stat-history">
                    <span>{t('roullete:recent')}</span>
                    <ul className="history">
                        {previous.slice(0, 10).map(round => <li key={round.roundId} className={round.color.toLowerCase()} onClick={() => dispatch(showRoundDetail(round.roundId, id => getRoulleteRound(id) ))}></li> )}
                    </ul>
                </div>
                <div className="roulette-stat-last">
                    <span>{t('roullete:last')} 100</span>
                    <div className="values">
                        <div className="values-item"><span className={'color red'}></span> <span>{previous.slice(0, 100).filter(item => item.color === 'Red').length}</span> </div>
                        <div className="values-item"><span className={'color black'}></span> <span>{previous.slice(0, 100).filter(item => item.color === 'Black').length}</span> </div>
                        <div className="values-item"><span className={'color green'}></span> <span>{previous.slice(0, 100).filter(item => item.color === 'Green').length}</span> </div>
                    </div>
                </div>
            </div>
            <RouletteAnimate/>
            <GameAmount rates={rates} changeAmount={inputAmount} amount={amount} game={roullete}/>
            <div className="roulette-bets">
                <RouletteBets className={'black'} bets={betsAll.filter(item => item.c === 'Black')} type={'Black'}/>
                <RouletteBets className={'green'} bets={betsAll.filter(item => item.c === 'Green')} type={'Green'}/>
                <RouletteBets className={'red'} bets={betsAll.filter(item => item.c === 'Red')} type={'Red'}/>
            </div>
            {roullete ? <Hash hash={roullete.previousHash} /> : '' }
        </div>
    )
}