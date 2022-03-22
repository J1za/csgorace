import React from 'react'

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { useTranslation } from 'react-i18next'

import { cancelGame, joinGame, showTrackRace } from '../redux/actions'

import Racer from './Racer'

import Helmet1 from '../assets/race/helmet1.png'
import Helmet2 from '../assets/race/helmet2.png'

import { ReactComponent as Fuel } from '../assets/fuel.svg'
// import { ReactComponent as Top } from '../assets/race/vs/top.svg'
// import { ReactComponent as All } from '../assets/race/vs/all.svg'
import { ReactComponent as Vs } from '../assets/vs.svg'

import './RaceGame.scss'

export default function RaceGame({ game, timeoutRaceAnimate }) {

    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)
    const dispatch = useDispatch()

    const { t } = useTranslation(['race'])

    return (
        <div className="race-game">
            <div className="race-game-body">
                <span className={"racer-left " + ((game.w && (game.w === game.f_p.s_i)) ? 'racer-left-animate-shadow' : '')}></span> 
                {!game.s_p ? (
                    <div className={"race-game-body-start " + (game.f_p.s_i === user?.steamId ? 'me' : '')}>
                        <div className="racer-start">
                            <Link to={"/profile/" + game.f_p.s_i} className={(game.f_p.l < 10 ? 'grey' : game.f_p.l < 20 ? 'blue' : game.f_p.l < 40 ? 'yellow' : game.f_p.l < 60 ? 'orange' : game.f_p.l < 80 ? 'violet' : game.f_p.l < 90 ? 'red' : game.f_p.l <= 100 ? 'fire' : '' )}> 
                                <img className={streamer && user?.steamId !== game.f_p.s_i ? 'streamer' : ''} src={game.f_p.a} alt="" />
                                <div className={"level " +  (game.f_p.l < 10 ? 'grey' : game.f_p.l < 20 ? 'blue' : game.f_p.l < 40 ? 'yellow' : game.f_p.l < 60 ? 'orange' : game.f_p.l < 80 ? 'violet' : game.f_p.l < 90 ? 'red' : game.f_p.l <= 100 ? 'fire' : '' )}>{game.f_p.l}</div> 
                            </Link>
                            <div className="info">
                                <span>{t('race:raceWith')}</span>
                                <div className="nickname">{game.f_p.u}</div>
                            </div>
                        </div>
                        <div className="racer-start-bet">
                            <Fuel/>
                            <span>{game.f_p.b_a}</span>
                        </div>
                        <img src={game.f_p.s_i === user?.steamId ? Helmet2 : Helmet1} className={'helmet'} alt="" />
                    </div>
                ) : (
                    <div className="race-game-body-current">
                        <Racer racer={game.f_p} className={'racer-blue'} car={'blue'}/>
                        <div className="vs">
                            <Vs/>
                        </div>
                        <Racer racer={game.s_p} className={'racer-red'} car={'red'}/>
                    </div>
                )}
                <span className={"racer-right " + ((game.w && (game.w === game.s_p?.s_i)) ? 'racer-right-animate-shadow' : '')}></span>
            </div>
            <button className={"race-game-nav " + (game.f_p && game.s_p ? 'current' : game.f_p?.s_i === user?.steamId ? 'me' : 'other')} onClick={() => game.f_p && game.s_p ? (() => {
                dispatch(showTrackRace(game))
                timeoutRaceAnimate()
            })() : game.f_p.s_i === user?.steamId ? dispatch(cancelGame(game.r_i)) : (() => {
                dispatch(joinGame({ id: game.r_i, amount: game.f_p.b_a }))
                dispatch(showTrackRace(game))
                timeoutRaceAnimate()
            })()}>
                {game.f_p && game.s_p ? t('race:view') : game.f_p.s_i === user?.steamId ? t('race:cancel') : t('race:accept')}
            </button>
        </div>
    )
}