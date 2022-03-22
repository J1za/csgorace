import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { changeSelected, getTotHandler } from '../redux/actions'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import TopItem from '../components/TopItem'

import { ReactComponent as Time } from '../assets/time.svg'
import { ReactComponent as Fuel } from "../assets/fuel.svg"



import './Top.scss'
//eslint-disable-next-line
export default () => {

    const dispatch = useDispatch()
    const tot = useSelector(state => state.tot.tot)
    const rewards = useSelector(state => state.tot.rewards)
    const totSelected = useSelector(state => state.tot.totSelected)
    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)
    //eslint-disable-next-line
    const [lastTimeOut, setLastTimeOut] = useState(null)

    const [ timer, setTimer ] = useState(null)

    const startTimer = mode => {
        if(mode === 'daily') {
            setTimer((24 * 60 * 60 * 1000) - ((new Date().getHours() * 60 * 60 * 1000) + ((new Date().getMinutes() * 60 * 1000)) + (new Date().getSeconds() * 1000)))
            setLastTimeOut(setInterval(() => {
                setTimer(prev => prev - 1000)
            }, 1000))
        } else if (mode === 'monthly') {
            setTimer(((new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()) * 24 * 60 * 60 * 1000 + (24 * 60 * 60 * 1000)) - ((new Date().getDate() * 24 * 60 * 60 * 1000) + (new Date().getHours() * 60 * 60 * 1000) + ((new Date().getMinutes() * 60 * 1000)) + (new Date().getSeconds() * 1000)))
            setLastTimeOut(setInterval(() => {
                setTimer(prev => prev - 1000)
            }, 1000))
        }
    }

    const cleaner = () => {
        setLastTimeOut(prev => {
            if(prev){
                while (prev--) {
                    clearInterval(prev)
                }
            }
            clearInterval(prev)
            return null
        })
    }

    const { t } = useTranslation(['tot'])

    useEffect(() => {
        dispatch(getTotHandler())
        return () => cleaner()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        clearInterval(lastTimeOut)
        startTimer(totSelected)
        //eslint-disable-next-line
    }, [totSelected])

    if(!tot) return false

    return (
        <div className="top">
            <div className="top-header">
                <h2>{t('tot:top')}</h2>
                {totSelected !== 'ever' ? <div className="timer">
                    <Time/> End in { totSelected !== 'ever' ? `${totSelected === 'monthly' ? Math.floor(timer / (60 * 60 * 24 * 1000)) + ' d' : ''} ${parseInt((timer / (1000 * 60 * 60)) % 24)}:${parseInt((timer / (1000 * 60)) % 60)}:${parseInt((timer / 1000) % 60)}`  : '' }
                </div> : ''}
            </div>
            <div className="top-best">
                <TopItem userData={tot[totSelected][2]} className={'third'} pos={3} filter={totSelected}/>
                <TopItem userData={tot[totSelected][0]} className={'first'} pos={1} filter={totSelected}/>
                <TopItem userData={tot[totSelected][1]} className={'second'} pos={2} filter={totSelected}/>
            </div>
            <ul className="top-list">
                <li className="top-list-header">
                    <button className={totSelected === 'ever' ? 'active' : ''} onClick={() => dispatch(changeSelected('ever'))}>{t('tot:allTime')}</button>
                    <button className={totSelected === 'monthly' ? 'active' : ''} onClick={() => dispatch(changeSelected('monthly'))}>{t('tot:month')}</button>
                    <button className={totSelected === 'daily' ? 'active' : ''} onClick={() => dispatch(changeSelected('daily'))}>{t('tot:week')}</button>
                </li>
                { tot[totSelected]?.map((item, index) => index <= 2 ? false : <li className={"top-list-player " + (user?.steamId === item.steamId ? 'is-me' : '')} key={index}>
                    <div className="number">{index + 1}</div>
                    <Link to={"/profile/" + item.steamId} className={"image "  + (item.level < 10 ? 'grey' : item.level < 20 ? 'blue' : item.level < 40 ? 'yellow' : item.level < 60 ? 'orange' : item.level < 80 ? 'violet' : item.level < 90 ? 'red' : item.level <= 100 ? 'fire' : '' )}><img className={(streamer && user?.steamId !== item.steamId ? 'streamer ' : '')} src={item.profileAvatar} alt="" /></Link>
                    <Link to={'/profile/' + item.steamId} className="name">{streamer && user?.steamId !== item.steamId ? '*'.repeat(item.nickname.length) : item.nickname}</Link>
                    <div className={"level " +  (item.level < 10 ? 'grey' : item.level < 20 ? 'blue' : item.level < 40 ? 'yellow' : item.level < 60 ? 'orange' : item.level < 80 ? 'violet' : item.level < 90 ? 'red' : item.level <= 100 ? 'fire' : '' )}>{item.level}</div>
                    <div className={"wagered " + (totSelected === 'ever' ? 'hide' : '')}><Fuel/> +{new Intl.NumberFormat('ru-RU').format(+(totSelected === 'daily' ? rewards.find(wagered => wagered.place === index + 1 && wagered.type === 'D')?.amount : totSelected === 'monthly' ? rewards.find(wagered => wagered.place === index + 1 && wagered.type === 'M')?.amount : '0'))}</div>
                    <div className={"bet " + (totSelected === 'ever' ? 'full' : '')}><Fuel/>{new Intl.NumberFormat('ru-RU').format(+(item.totalBet || item.monthlyBet || item.dailyBet || 0))}</div>
                </li>) }
            </ul>
        </div>
    )
}