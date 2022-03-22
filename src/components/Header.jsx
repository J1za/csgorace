import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import ButtonYellow from './ButtonYellow'
import { DOMAIN } from '../utilites/api'
import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'

import { changeLang, showMobileChat, showMobileMenu, hideMobileChat, hideMobileMenu, showDeposit, hideMobileNotification, showMobileNotification } from '../redux/actions'

import { ReactComponent as Logo } from '../assets/logo.svg'
import { ReactComponent as Arrow } from '../assets/arrow-down.svg'
import { ReactComponent as Chat } from '../assets/chat.svg'
import { ReactComponent as Plus } from '../assets/plus.svg'
import { ReactComponent as Menu } from '../assets/menu.svg'
import { ReactComponent as Fuel } from '../assets/fuel.svg'
import { ReactComponent as Close } from '../assets/close.svg'
import { ReactComponent as Notification } from '../assets/notification.svg'

import { ReactComponent as Ru } from '../assets/ru.svg'
import { ReactComponent as Gb } from '../assets/gb.svg'

import { ReactComponent as Green } from '../assets/notification/green.svg'
import { ReactComponent as Red } from '../assets/notification/red.svg'
import { ReactComponent as Yellow } from '../assets/notification/yellow.svg'



import './Header.scss'
//eslint-disable-next-line
export default () => {

    const [lang, setLang] = useState(false)
    const [notification, setNotification] = useState(false)

    const user = useSelector(state => state.app.user)
    const notifications = useSelector(state => state.app.notifications)
    const mobileMenu = useSelector(state => state.popup.mobileMenu)
    const mobileChat = useSelector(state => state.popup.mobileChat)
    const mobileNotification = useSelector(state => state.popup.mobileNotification)
    const dispatch = useDispatch()
    const { i18n, t } = useTranslation(['login', 'main'])


    const clickHandler = event => {
        if(!event.target.closest('.header-lang')){
            setLang(false)
        }
        if(!event.target.closest('.header-notifications')){
            setNotification(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandler)
        return () => {
            window.removeEventListener('click', clickHandler, false)
        }
    }, [])

    return (
        <header className={'header'}>
            <Link to="/streetrace" ><Logo className="logo"/></Link>
            <div className="header-mobile">
                {/* {mobileNotification ? <div className="close-mobile" onClick={() => dispatch(hideMobileNotification())}><Arrow/></div> : <div className="header-mobile-notification"><Notification onClick={() => dispatch(showMobileNotification())}/>{notifications.length > 0 ? <div className="notification-count">{notifications.length}</div> : '' }</div>} */}
                {mobileChat ? <div className="close-mobile" onClick={() => dispatch(hideMobileChat())}><Arrow/></div> : <Chat className="chat-icon" onClick={() => dispatch(showMobileChat())}/> }
                {mobileMenu ? <div className="close-mobile" onClick={() => dispatch(hideMobileMenu())}><Arrow/></div> : <Menu onClick={() => dispatch(showMobileMenu())}/> }
                <div className="balance" onClick={() => dispatch(showDeposit())}>
                    <Fuel/>
                    <span>{user?.walletsBalance[0].amount}</span>
                    <div className="balance-add"><Plus/></div>
                </div>
                { user ? <Link to={"/profile/" + user?.steamId} className={"user "  +  (user.level < 10 ? 'grey' : user.level < 20 ? 'blue' : user.level < 40 ? 'yellow' : user.level < 60 ? 'orange' : user.level < 80 ? 'violet' : user.level < 90 ? 'red' : user.level <= 100 ? 'fire' : '' )}>
                    <img src={user.profileAvatar} alt="" className="user-image" /> 
                    <div className={"level " +  (user.level < 10 ? 'grey' : user.level < 20 ? 'blue' : user.level < 40 ? 'yellow' : user.level < 60 ? 'orange' : user.level < 80 ? 'violet' : user.level < 90 ? 'red' : user.level <= 100 ? 'fire' : '' )}>{user.level}</div> 
                </Link> : <ButtonYellow href={`${DOMAIN}auth/steam`}>{t('main:login')}</ButtonYellow> }
            </div>
            <div className={"header-notifications "} onClick={() => setNotification(prev => !prev)}>
                <Notification/>
                {notifications.length > 0 ? <div className="notification-count">{notifications.length}</div> : '' }
                <div className={"header-notifications-popup " + (notification ? 'active' : '')} onClick={event => event.stopPropagation()}>
                    <div className="popup-arrow"></div>
                    <div className="notifications-header">{t('main:notification')} <Close onClick={() => setNotification(false)}/> </div>
                    <div className="notifications-list">
                        {notifications.length ? notifications.map(item => item.link ? (
                             <Link to={item.link} className="notifications-list-item">
                                {item.success === true ? <Green/> : item.success === false ? <Red/> : <Yellow/>}
                                <div className="info">
                                    <div className="info-date">{item.moment}</div>
                                    <div className="info-text">{
                                    item.type === 'Support' && item.success === true ? t('main:notificationTypes.1') + item.data + t('main:notificationTypes.1,1') : 
                                    item.type === 'Support' && item.success === false ? t('main:notificationTypes.2') + item.data + t('main:notificationTypes.2,1') : 
                                    item.type === 'Limit' && item.success === true ? t('main:notificationTypes.3') + item.data : 
                                    item.type === 'Limit' && item.success === false ? t('main:notificationTypes.4') : 
                                    item.type === 'Daily ToT' && item.success === true ? t('main:notificationTypes.5') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.5,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.5,2') : 
                                    item.type === 'Daily ToT' && item.success === false ? t('main:notificationTypes.6') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.6,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.6,2') : 
                                    item.type === 'Monthly ToT' && item.success === true ? t('main:notificationTypes.7') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.7,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.8,2') : 
                                    item.type === 'Monthly ToT' && item.success === false ? t('main:notificationTypes.8') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.8,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.8,2') : 
                                    item.type === 'Achievement' && item.success === true ? t('main:notificationTypes.9') + item.data + '"' : item.type
                                    }</div>
                                </div>
                            </Link>
                        ) : (
                            <div className="notifications-list-item">
                                {item.success === true ? <Green/> : item.success === false ? <Red/> : <Yellow/>}
                                <div className="info">
                                    <div className="info-date">{item.moment}</div>
                                    <div className="info-text">{
                                    item.type === 'Support' && item.success === true ? t('main:notificationTypes.1') + item.data + t('main:notificationTypes.1,1') : 
                                    item.type === 'Support' && item.success === false ? t('main:notificationTypes.2') + item.data + t('main:notificationTypes.2,1') : 
                                    item.type === 'Limit' && item.success === true ? t('main:notificationTypes.3') + item.data : 
                                    item.type === 'Limit' && item.success === false ? t('main:notificationTypes.4') : 
                                    item.type === 'Daily ToT' && item.success === true ? t('main:notificationTypes.5') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.5,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.5,2') : 
                                    item.type === 'Daily ToT' && item.success === false ? t('main:notificationTypes.6') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.6,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.6,2') : 
                                    item.type === 'Monthly ToT' && item.success === true ? t('main:notificationTypes.7') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.7,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.8,2') : 
                                    item.type === 'Monthly ToT' && item.success === false ? t('main:notificationTypes.8') + (user?.language === 'en' ? item.data.amount : item.data.place) + t('main:notificationTypes.8,1') + (user?.language === 'en' ? item.data.place : item.data.amount) + t('main:notificationTypes.8,2') : 
                                    item.type === 'Achievement' && item.success === true ? t('main:notificationTypes.9') + item.data + '"' : item.type
                                    }</div>
                                </div>
                            </div>
                        )) : <div className='notifications-list-item notifications-list-item-empty'>
                            {t('main:notificationNone')}
                        </div> }
                    </div>
                </div>
            </div>
            <div className={"header-lang "  + (lang ? 'active' : '')} onClick={() => setLang(prev => !prev)}>
                <div className="header-lang-current"><span>{(user?.language || i18n.language) === 'ru' ? <Ru/> : <Gb/>}{user?.language || i18n.language }</span><Arrow/></div>
                <div className={"header-lang-list"}>
                    {user?.language === 'en' || i18n.language === 'en' ? <span onClick={() => {
                        dispatch(changeLang('ru'))
                        i18n.changeLanguage('ru')
                    }}><Ru/> ru</span> : ''}
                    {user?.language === 'ru' || i18n.language === 'ru' ? <span onClick={() => {
                        dispatch(changeLang('en'))
                        i18n.changeLanguage('en')
                    }}><Gb/> en</span> : '' }
                </div>
            </div>
        </header>
    )
}