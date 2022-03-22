import React from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { streetraceBetHandler } from '../redux/actions'


import { useTranslation } from 'react-i18next'

import { ReactComponent as Fuel } from '../assets/fuel.svg'

import './StreetraceBets.scss'

//eslint-disable-next-line
export default ({ bets, className = '', type }) => {

    const { t } = useTranslation(['streetrace'])


    const user = useSelector(state => state.app.user)

    const betsCount = useSelector(state =>  state.streetrace.bets.reduce((counter, value) => counter + value.b_a, 0))
    const betsLength = useSelector(state => state.streetrace.bets.length)
    const amount = useSelector(state => state.amount.amount)
    const maxAmount = useSelector(state => state.amount.maxAmount)
    const stage = useSelector(state => state.streetrace.stage)
    const previous = useSelector(state => state.streetrace.previous.slice(0, 10))
    const winner = useSelector(state => state.streetrace.winner)
    const streamer = useSelector(state => state.app.streamer)
    const streetrace = useSelector(state => state.streetrace.streetrace)

    const dispatch = useDispatch()

    return (
        <div className={"streetrace-column " + className}>
            <div className="streetrace-column-x">{3.75}x</div>
            <div className={"streetrace-column-bankroll " + (stage === 0 ? (previous[0]?.car === type ? 'green' : 'red' ) : '')}> <Fuel/>  <span>{stage === 0 ? (previous[0]?.car === type ? '+' + (bets.reduce((counter, value) => counter + value.b_a, 0)).toFixed(2) :  '-' + (bets.reduce((counter, value) => counter + value.b_a, 0)).toFixed(2)) : (bets.reduce((counter, value) => counter + value.b_a, 0)).toFixed(2)}</span></div>
            <button 
                className={"streetrace-column-btn " + (winner === type ? 'winner' : '')}
                disabled={!(betsCount + +amount <= streetrace?.maxBet) || !(+amount <= maxAmount) || !(betsLength < 5) || stage === 2 || (stage === 2 && betsLength) || !user}
                onClick={() => (betsCount + +amount <= streetrace?.maxBet) && (+amount <= maxAmount) && (betsLength < 5) ?  dispatch(streetraceBetHandler(type)) : false}>{t('streetrace:placeBet')}</button>
            <ul className="streetrace-column-list">
                {bets.map((item, index) => <li key={index} className={"bet-item " + (user?.steamId === item.s_i ? 'is-me' : '')}>
                    <Link to={"/profile/" + item.s_i} className={(item.l < 10 ? 'grey' : item.l < 20 ? 'blue' : item.l < 40 ? 'yellow' : item.l < 60 ? 'orange' : item.l < 80 ? 'violet' : item.l < 90 ? 'red' : item.l <= 100 ? 'fire' : '' )}><img className={streamer && user?.steamId !== item.s_i ? 'streamer' : ''} src={item.a} alt="" /></Link>
                    <span>{streamer && user?.steamId !== item.s_i ? '*'.repeat(item.u.length) : item.u}</span>
                    <div className={"level " + (item.l < 10 ? 'grey' : item.l < 20 ? 'blue' : item.l < 40 ? 'yellow' : item.l < 60 ? 'orange' : item.l < 80 ? 'violet' : item.l < 90 ? 'red' : item.l <= 100 ? 'fire' : '' )}>{item.l}</div>
                    <div className="bet-value">
                        <Fuel className={(stage === 0 ? (previous[0].car === type ? 'green' : 'red' ) : '')}/>
                        <div className={"bet " + (stage === 0 ? (previous[0].car === type ? 'green' : 'red' ) : '')}>{stage === 0 ? (previous[0].car === type ? '+' + (item.b_a * 3.75 > streetrace.maxPayout ? streetrace.maxPayout : item.b_a * 3.75).toFixed(2) : '-' + item.b_a ) : item.b_a}</div>
                    </div>
                </li>)}
            </ul>
        </div>   
    )
}