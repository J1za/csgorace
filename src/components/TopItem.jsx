import React from 'react'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { ReactComponent as Fuel } from "../assets/fuel.svg"

import Pos1 from '../assets/top/1.png'
import Pos2 from '../assets/top/2.png'
import Pos3 from '../assets/top/3.png'

import './TopItem.scss'
//eslint-disable-next-line
export default ({ userData = null, className = '', pos = 0, filter = '' }) => {

    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)
    const rewards = useSelector(state => state.tot.rewards)

    if(!userData) return ''

    return <div className={"top-item " + className}>
        <div className="top-item-body">
            <Link to={"/profile/" + userData.steamId} className={'image ' +  (userData.level < 10 ? 'grey' : userData.level < 20 ? 'blue' : userData.level < 40 ? 'yellow' : userData.level < 60 ? 'orange' : userData.level < 80 ? 'violet' : userData.level < 90 ? 'red' : userData.level <= 100 ? 'fire' : '' ) } >
                <img src={userData.profileAvatar} className={streamer && user?.steamId !== userData.steamId ? 'streamer' : ''} alt=""/>
                <div className={"level " +  (userData.level < 10 ? 'grey' : userData.level < 20 ? 'blue' : userData.level < 40 ? 'yellow' : userData.level < 60 ? 'orange' : userData.level < 80 ? 'violet' : userData.level < 90 ? 'red' : userData.level <= 100 ? 'fire' : '' )}>{userData.level}</div> 
            </Link>
            <Link to={"/profile/" + userData.steamId} className="name">{streamer && user?.steamId !== userData.steamId ? '*'.repeat(userData.nickname.length) : userData.nickname}</Link>
            <div className="fuel"><Fuel/><span>{new Intl.NumberFormat('ru-RU').format(+(userData?.totalBet ?? userData?.monthlyBet ?? userData?.dailyBet))}</span></div>
            <div className={"won " + (filter === 'ever' ? 'hide' : '')}><Fuel/> <span> + {filter === 'daily' ? rewards.find(wagered => wagered.place === pos && wagered.type === 'D')?.amount : filter === 'monthly' ? rewards.find(wagered => wagered.place === pos && wagered.type === 'M')?.amount : ''}</span> </div>
            <img src={pos === 1 ? Pos1 : pos === 2 ? Pos2 : Pos3} alt="" className="cup" />
        </div>
        <div className={"top-item-count " + (pos === 1 ? 'gold' : '')}>TOP {pos}</div>
    </div>
}