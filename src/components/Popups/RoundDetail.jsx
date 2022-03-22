import React from 'react'

import { Link } from 'react-router-dom'
import { useDispatch,  useSelector } from 'react-redux' 

import { useTranslation } from 'react-i18next'
import { hideRoundDetail } from '../../redux/actions'

import { ReactComponent as Calendar } from '../../assets/detail/calendar.svg'
import { ReactComponent as Car } from '../../assets/detail/car.svg'
import { ReactComponent as Clock } from '../../assets/detail/clock.svg'
import { ReactComponent as Hash } from '../../assets/detail/hash.svg'
import { ReactComponent as Player } from '../../assets/detail/player.svg'
import { ReactComponent as Fuel } from '../../assets/fuel.svg'

import Popup from './Popup'


import './RoundDetail.scss'
//eslint-disable-next-line
export default () => {

    const { t } = useTranslation(['crash'])
    const dispatch = useDispatch()

    const streamer = useSelector(state => state.app.streamer)
    const user = useSelector(state => state.app.user)
    const round = useSelector(state => state.popup.round)
    const roundDetail = useSelector(state => state.popup.roundDetail)
    const players = useSelector(state => state.popup.round?.players)

    return (
        <Popup popup={roundDetail} className={'round-detail'} handler={() => dispatch(hideRoundDetail())}>
            <div className="round-detail-header">{t('crash:round')} #{round?.roundId}</div>
            <ul className="round-detail-data">
                <li className="data-item">
                    <div className="data-item-name"><Calendar/>{t('crash:datetime')}</div>
                    <div className="data-item-value">{round?.date}</div>
                </li>
                <li className="data-item">
                    <div className="data-item-name"><Clock/>{t('crash:hour')}</div>
                    <div className="data-item-value">{round?.time}</div>
                </li>
                <li className="data-item">
                    <div className="data-item-name"><Car/>{round?.x ? t('crash:crashPoint') : round?.color ? t('crash:color') : round?.winner ? t('crash:winner') : t('crash:car')}</div>
                    <div className="data-item-value">{round?.x || round?.color || (round?.car + 1 ? round?.car + 1 : 0) || round?.winner}</div>
                </li>
                <li className="data-item">
                    <div className="data-item-name"><Hash/>{t('crash:roundHash')}</div>
                    <div className="data-item-value">{round?.roundHash}</div>
                </li>
                <li className="data-item">
                    <div className="data-item-name"><Hash className={'question'}/>{t('crash:saltedHash')}</div>
                    <div className="data-item-value">{round?.saltedHash}</div>
                </li>
                <li className="data-item">
                    <div className="data-item-name"><Player/>{t('crash:totalPlayers')}</div>
                    <div className="data-item-value">{round?.totalPlayers ?? 2}</div>
                </li>
            </ul>
            <div className="round-detail-players-header">
                <div className="name">{t('crash:player')}</div>
                <div className="cashout">{round?.x ? t('crash:cashedOut') : round?.color ? t('crash:color') : round?.winner ? 'Steam Id' : t('crash:car')}</div>
                <div className="earnings">{t('crash:earnings')}</div>
            </div>
            <ul className="round-detail-players">
                {players?.map((player, index) => <li className={'player ' + (round?.x ? ( player.w ? 'won' : 'lose') : round?.color ? (player.c === round?.color ? 'won' : 'lose') :  round?.winner ? (player.s_i === round?.winner ? 'won' : 'lose') : (player.c === round?.car ? 'won' : 'lose'))} key={index}>
                    <div className="name">
                        <Link to={"/profile/" + player.s_i} onClick={() => dispatch(hideRoundDetail())} className={(player.l < 10 ? 'grey' : player.l < 20 ? 'blue' : player.l < 40 ? 'yellow' : player.l < 60 ? 'orange' : player.l < 80 ? 'violet' : player.l < 90 ? 'red' : player.l <= 100 ? 'fire' : '' )}><img className={streamer && user?.steamId !== player.s_i ? 'streamer' : ''} src={player.a} alt="" /></Link>
                        <span>{streamer && user?.steamId !== player.s_i ? '*'.repeat(player.u.length) : player.u}</span>
                        <span className={"l "  + (player.l < 10 ? 'grey' : player.l < 20 ? 'blue' : player.l < 40 ? 'yellow' : player.l < 60 ? 'orange' : player.l < 80 ? 'violet' : player.l < 90 ? 'red' : player.l <= 100 ? 'fire' : '' )}>{player.l}</span>
                    </div>
                    <div className="cashout">{round.x ? (player.c ? '@' + player.c : '\u2014') : round?.car ? (player.c + 1) : (player.c || player.s_i)}</div>
                    <div className="earnings"><Fuel/>{round.x ? player.c ? +(player.c ? player.c * player.b_a - player.b_a : player.b_a * -1).toFixed(2) : '\u2014' + (player.b_a).toFixed(2) : round.color ? +(round.color === player.c ? (player.c === 'Green' ? player.b_a * 14 - player.b_a : player.b_a * 2 - player.b_a) : player.b_a * -1 ).toFixed(2) : round?.winner ? +(player.w - player.b_a).toFixed(2) : (player.c !== round?.car ? '-' + (player.b_a).toFixed(2) : ((player.b_a * 3.75) - player.b_a).toFixed(2))}</div>
                </li> )}
            </ul>
        </Popup>
    )
}