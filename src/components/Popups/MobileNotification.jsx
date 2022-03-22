import React from 'react'

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux' 

import { hideMobileNotification } from '../../redux/actions'

import { useTranslation } from 'react-i18next'

import Popup from './Popup'

import { ReactComponent as Green } from '../../assets/notification/green.svg'
import { ReactComponent as Red } from '../../assets/notification/red.svg'
import { ReactComponent as Yellow } from '../../assets/notification/yellow.svg'

import { ReactComponent as Close } from '../../assets/close.svg'


import './MobileNotification.scss'
//eslint-disable-next-line
export default () => {

    const { t } = useTranslation(['main'])

    const user = useSelector(state => state.app.user)
    const notifications = useSelector(state => state.app.notifications)
    const mobileNotification = useSelector(state => state.popup.mobileNotification)

    const dispatch = useDispatch()

    return (
        <Popup popup={mobileNotification} handler={hideMobileNotification} className={'mobile-notification'} mobile={true}>
            <div className="mobile-notification-header">
                {t('main:notification')} <Close onClick={() => dispatch(hideMobileNotification())}/>
            </div>
            <div className="mobile-notification-list">
                {notifications.length ? notifications.map(item => item.link ? (
                            <Link to={item.link} className="mobile-notification-list-item">
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
                    <div className="mobile-notification-list-item">
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
                )) : <div className='mobile-notification-list-item mobile-notification-list-item-empty'>
                    {t('main:notificationNone')}
                </div>}
            </div>
        </Popup>
    )
}