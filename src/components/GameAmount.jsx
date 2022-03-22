import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {ReactComponent as Fuel } from '../assets/fuel.svg'

import './GameAmount.scss'
//eslint-disable-next-line
export default ({ rates = [], changeAmount = () => false, game = {}, amount = '', button = '' }) => {

    const { t } = useTranslation(['roullete'])

    const user = useSelector(state => state.app.user)
    const dispatch = useDispatch()

    return (
        <div className={"game-amount " + (button ? 'radius' : '')}>
            <div className="amount">
                <span className="amount-header">{t('roullete:amount')}</span>
                <div className="amount-value">
                    <Fuel/>
                    <input type="text" value={amount} disabled={!user} step="0.01" min="0.01" onChange={event => dispatch(changeAmount(event.target.value))} />
                    <div className="amount-value-clear" onClick={() => dispatch(changeAmount(''))}>{t('roullete:clear')}</div>
                </div>
                <div className="amount-values">
                    <span>{t('roullete:maxBet')} <span>{game?.maxBet}</span></span>
                    <span>{t('roullete:maxWin')} 
                    {game ? <span>{game.maxPayout || (game.maxBet * 2)}</span> : '' }
                    </span>
                </div>
            </div>
            {button}
            <div className="rates">
                <span className="rates-header">{t('roullete:betAmount')}</span>
                <div className="rates-body">
                    {/* <div className="rates-body-clear" onClick={() => dispatch(changeAmount(''))}>{t('roullete:clear')}</div> */}
                    <ul className="rates-body-list">
                        {rates.map(item => <li key={item.id} onClick={() => user ? dispatch({type: item.do }) : false} >{item.name}</li> )}
                    </ul>
                </div>
            </div>
        </div>
    )
}