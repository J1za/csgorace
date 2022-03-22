import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import { ReactComponent as Fuel } from '../assets/fuel.svg'

import './WithdrawItem.scss'
import ButtonYellow from './ButtonYellow'

export default function WithdrawItem({ item }) {

    const { t } = useTranslation(['withdraw'])
    const [ timer, setTimer ] = useState(0)
    const [ intervalTimer, setIntervalTime ] = useState(null)

    const streamer = useSelector(state => state.app.streamer)
    const user = useSelector(state => state.app.user)

    useEffect(() => {
        if(item.till && !intervalTimer){
            let time = (item.till * 1000) - 1000 * 60 * 60 * 7 - Date.now()
            setTimer(time < 0 ? 0 : time)
            setIntervalTime(setInterval(() => {
                setTimer(prev => prev - 1000 >= 0 ? prev - 1000 : prev) 
            }, 1000))
            setIntervalTime(setTimeout(() => {
                clearInterval(intervalTimer)
            }, time))
        }
        // eslint-disable-next-line
    }, [item])

    useEffect(() => {
        return () => setIntervalTime(prev => {
            if(prev){
                while (prev--) {
                    clearTimeout(prev)
                    clearInterval(prev)
                }
            }
            return null
        })
        // eslint-disable-next-line
    }, [])

    return (
        <li className="withdraw-item">
            <div className="withdraw-item-header">
                <Link to={'/'}><img src={item.avatar} className={streamer && true ? 'streamer' : ''} alt="" /></Link>
                <span className="username">{item.nick}</span>
            </div>
            <div className="withdraw-item-body">
                <img src={item.image} alt="" />
                <div className="info">
                    <div className="name">{item.name}</div>
                    <div className="price">
                        <Fuel/>
                        <span>{item.price}</span>
                    </div>
                </div>
            </div>
            { item.till && timer !== undefined ? <>
                <a href={"https://steamcommunity.com/tradeoffer/" + item.trade_id} rel="noreferrer" target="_blank" > <ButtonYellow className={'withdraw-item-accept'}>{t('withdraw:acceptTrade')}</ButtonYellow> </a>
                <div className="withdraw-item-status">
                    <div className="status-line" style={{width: 100 - (timer / (600000 / 100)) + '%' }}></div>
                </div>
                <div className="withdraw-item-description">
                    {t('withdraw:otherUser')} <span className="time">{Math.floor((timer / (1000 * 60)) % 60)}m {Math.floor((timer / 1000) % 60)}</span> {t('withdraw:toComplete')}
                </div>
            </> : <div className="withdraw-item-description">
                    {t('withdraw:preparing')}
                </div> }
        </li>
    )
}