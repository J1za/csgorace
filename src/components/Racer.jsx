import React from 'react'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import {ReactComponent as Fuel } from '../assets/fuel.svg'
import {ReactComponent as Car1 } from '../assets/race/vs/car1.svg'
import {ReactComponent as Car2 } from '../assets/race/vs/car2.svg'

import './Racer.scss'
//eslint-disable-next-line
export default ({ racer, className = '', car = '' }) => {

    const streamer = useSelector(state => state.app.streamer)
    const user = useSelector(state => state.app.user)

    if(!racer) return false

    return (
        <div className={"racer " + className}>
            <div className="racer-images">
                <Link to={"/profile/" + (racer.s_i)} className={(racer.l < 10 ? 'grey' : racer.l < 20 ? 'blue' : racer.l < 40 ? 'yellow' : racer.l < 60 ? 'orange' : racer.l < 80 ? 'violet' : racer.l < 90 ? 'red' : racer.l <= 100 ? 'fire' : '' )}> 
                    <img className={streamer && user?.steamId !== (racer.s_i) ? 'streamer' : ''} src={racer.a} alt="" />
                    <div className={"level " + (racer.l < 10 ? 'grey' : racer.l < 20 ? 'blue' : racer.l < 40 ? 'yellow' : racer.l < 60 ? 'orange' : racer.l < 80 ? 'violet' : racer.l < 90 ? 'red' : racer.l <= 100 ? 'fire' : '' )}>{racer.l}</div> 
                </Link>
                <div className="racer-car">{car === 'blue' ? <Car1/> : <Car2/>}</div>
            </div>
            {/* <span className={"racer-level " + (racer.l < 10 ? 'grey' : racer.l < 20 ? 'blue' : racer.l < 40 ? 'yellow' : racer.l < 60 ? 'orange' : racer.l < 80 ? 'violet' : racer.l < 90 ? 'red' : racer.l <= 100 ? 'fire' : '' )}>{racer.l}</span> */}
            <div className="racer-name">{streamer && user?.steamId !== (racer.s_i) ? '*'.repeat((racer.u).length) : (racer.u)}</div>
            <div className="racer-bet">
                <Fuel/>
                <span>{(new Intl.NumberFormat('ru-RU').format(+(racer.b_a)).toString().replace(',', '.'))}</span>
            </div>
        </div>
    )
}