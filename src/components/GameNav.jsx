import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ReactComponent as Streetrace } from '../assets/games/streetrace.svg'
import { ReactComponent as Crash } from '../assets/games/crash.svg'
import { ReactComponent as Roulette } from '../assets/games/roulette.svg'
import { ReactComponent as Racing } from '../assets/games/racing.svg'


import './GameNav.scss'

//eslint-disable-next-line
export default () => {

    const location = useLocation()

    return (
        <div className="game-nav">
                <Link to="/streetrace" className={'game-nav-item ' + (location.pathname.includes('/streetrace') ? 'active' : '')}>
                    <Streetrace/>
                    <span>Streetrace</span>
                </Link>
                <Link to="/race" className={'game-nav-item ' + (location.pathname.includes('/race') ? 'active' : '')}>
                    <Racing/>
                    <span>Race</span>
                </Link>
                <Link to="/crash" className={'game-nav-item ' + (location.pathname.includes('/crash') ? 'active' : '')}>
                    <Crash/>
                    <span>Crash</span>
                </Link>
                <Link to="/roulette" className={'game-nav-item ' + (location.pathname.includes('/roulette') ? 'active' : '')}>
                    <Roulette/>
                    <span>Roulette</span>
                </Link>
        </div>
    )
}