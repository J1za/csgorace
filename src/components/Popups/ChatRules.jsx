import React from 'react'

import { useSelector, useDispatch } from 'react-redux' 
import { hideChatRules } from '../../redux/actions'

import { useTranslation } from 'react-i18next'

import { ReactComponent as Ban } from '../../assets/ban.svg'

import Popup from './Popup'

import './ChatRules.scss'
//eslint-disable-next-line
export default () => {

    const { t } = useTranslation(['main'])

    const chatRules = useSelector(state => state.popup.chatRules)
    const dispatch = useDispatch()

    return (
        <Popup popup={chatRules} className={'chat-rules-popup'} handler={() => dispatch(hideChatRules())}>
            <div className="chat-rules-popup-header">{t('main:chatMenu.rules')}</div>
            <p className="chat-rules-popup-body">
                <span className={'hello'}>{t('main:chatRules.hello')}</span>
                <span><Ban/>{t('main:chatRules.points.p1')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p2')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p3')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p4')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p5')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p6')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p7')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p8')}</span><br />
                <span><Ban/>{t('main:chatRules.points.p9')}</span><br />
                <span className={'hello'}>{t('main:chatRules.mute')}</span>
                <span className={'hello'}>{t('main:chatRules.ban')}</span>
                <span className={'hello'}>{t('main:chatRules.thanks')}</span>
                
            </p>
        </Popup>
    )
}