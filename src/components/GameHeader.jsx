import React from 'react'

import { useTranslation } from 'react-i18next'

import {ReactComponent as Fuel } from '../assets/fuel.svg'
import {ReactComponent as Volume } from '../assets/volume.svg'
import {ReactComponent as Mute } from '../assets/volume_mute.svg'
import {ReactComponent as Info } from '../assets/info.svg'


import './GameHeader.scss'
//eslint-disable-next-line
export default ({ title = '', timer = '', bankroll = 0, icon = '', cut = false, mute = null, muteHandler = () => false, infoHandler = null, popupText = '' }) => {

    const { t } = useTranslation(['roullete'])

    return (
        <div className="game-header">
            <h1>
                {title}
                {infoHandler ? <div className="info">
                    {infoHandler ? <Info className={'game-header-info'}/> : ''}
                    <div className="info-popup">
                        <div className="popup-name">{title}</div>
                        <div className="popup-text">{popupText}</div>
                    </div>
                </div> : '' }
                { mute !== null ? (mute ? <Mute onClick={muteHandler}/> : <Volume onClick={muteHandler}/>) : '' }</h1>
            { !cut ? <div className="timer">
                {icon}
                <span>{timer}</span>
            </div> : '' }
            { !cut ? <div className="bankroll">
                {t('roullete:bankroll')}
                <div className="fuel">
                    <Fuel/>
                    <span>{(bankroll).toFixed(2)}</span>
                </div>
            </div> : '' }
        </div>
    )
}