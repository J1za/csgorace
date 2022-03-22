import React, { useEffect, useState } from 'react'

import GameNav from '../components/GameNav'
import GameHeader from '../components/GameHeader'
import GameAmount from '../components/GameAmount'
import RaceAnimate from '../components/RaceAnimate'

import { useSelector, useDispatch } from 'react-redux'
import { createGame, getRaceHandler, hideTrackRace, inputAmount } from '../redux/actions'



import ButtonYellow from '../components/ButtonYellow'
import RaceGame from '../components/RaceGame'

import { useTranslation } from 'react-i18next'




import './Race.scss'

export default function Race(){

    const { t } = useTranslation(['race', 'crash'])

    const dispatch = useDispatch()

    const rates = useSelector(state => state.amount.rates)
    const amount = useSelector(state => state.amount.amount)
    const race = useSelector(state => state.race.race)
    const games = useSelector(state => state.race.games)
    const user = useSelector(state => state.app.user)

    const [timeoutAnimate, setTimeoutAnimate] = useState(null)

    const timeoutRaceAnimate = () => {
        clearTimeout(timeoutAnimate)
        setTimeoutAnimate(setTimeout(() => {
            dispatch(hideTrackRace())
        }, 15000))
    }

    useEffect(() => {
        dispatch(getRaceHandler())
        //eslint-disable-next-line
    }, [])

    return (
        <div className="race">
            <GameNav/>
            <GameHeader title={t('race:race')} cut={true}/>
            <RaceAnimate/>
            <GameAmount rates={rates} changeAmount={inputAmount} button={<ButtonYellow className={'race-create'} disabled={!user} onClick={() => dispatch(createGame(amount))}>{t('race:create')}</ButtonYellow>} amount={amount} game={race}/>
            <div className="race-games">
                {games.map(game => <RaceGame key={game.r_i} game={game} timeoutRaceAnimate={timeoutRaceAnimate}/>)}
            </div>
        </div>
    )
}