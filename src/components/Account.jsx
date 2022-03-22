import React from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import { showDeposit, hideMobileMenu, showMobileNotification } from '../redux/actions'

import { ReactComponent as Fuel } from '../assets/fuel.svg'
import { ReactComponent as Notification } from '../assets/notification.svg'


import './Account.scss'

//eslint-disable-next-line
export default ({ mobile = false }) => {

    const { t } = useTranslation(['profile'])

    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)
    const notifications = useSelector(state => state.app.notifications)
    const dispatch = useDispatch()

    if(!user){
        return false
    }
    return <div className={"account " + (mobile ? 'mobile' : '')}>
        <div className="account-image">
            <Link to={"/profile/" + user?.steamId} onClick={() => dispatch(hideMobileMenu())}>
                <div className={"user-image "  +  (user.level < 10 ? 'grey' : user.level < 20 ? 'blue' : user.level < 40 ? 'yellow' : user.level < 60 ? 'orange' : user.level < 80 ? 'violet' : user.level < 90 ? 'red' : user.level <= 100 ? 'fire' : '' )}>
                    <img src={user.profileAvatar} className={streamer ? 'streamer' : ''} alt=""/>  
                </div> 
                <div className={"level " +  (user.level < 10 ? 'grey' : user.level < 20 ? 'blue' : user.level < 40 ? 'yellow' : user.level < 60 ? 'orange' : user.level < 80 ? 'violet' : user.level < 90 ? 'red' : user.level <= 100 ? 'fire' : '' )}>{user.level}</div> 
            </Link>
        </div>
        <div className="account-nav">
            <Link to={"/profile/" + user?.steamId} className="account-nav-name"  onClick={() => dispatch(hideMobileMenu())}>
                <span>{user.nickname}</span>
                <div className="account-nav-name-numbers">
                    <div className={"level " +  (user.level < 10 ? 'grey' : user.level < 20 ? 'blue' : user.level < 40 ? 'yellow' : user.level < 60 ? 'orange' : user.level < 80 ? 'violet' : user.level < 90 ? 'red' : user.level <= 100 ? 'fire' : '' )}>{user.level}</div> 
                    <div className="account-nav-name-balance" onClick={() => mobile ? dispatch(showDeposit()) : false }>
                        <Fuel/>
                        <span>{user.walletsBalance[0].amount}</span>
                    </div>
                </div>
            </Link>
            <div className="account-nav-links">
                <Link to="/withdraw" className="account-nav-links-cash" onClick={() => dispatch(hideMobileMenu())}>{t('profile:cashOut')}</Link>
                <button onClick={() => {
                    dispatch(showDeposit())
                    dispatch(hideMobileMenu())
                }} className="account-nav-links-deposit">{t('profile:deposit')}</button>
            </div>
        </div>
        {mobile ? <div className="header-mobile-notification"><Notification onClick={() => dispatch(showMobileNotification())}/>{notifications.length > 0 ? <div className="notification-count">{notifications.length}</div> : '' }</div> : '' }
        {/* <div className="account-balance">
            <Fuel/>
            <span>{user.walletsBalance[0].amount}</span>
        </div> */}
    </div>
}