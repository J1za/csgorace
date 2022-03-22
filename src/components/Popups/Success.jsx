import React, { useEffect } from 'react'

import { useLocation } from 'react-router'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { hideDepositSuccess } from '../../redux/actions'

import Popup from './Popup'


import success from '../../assets/success.png'


import './Success.scss'
 //eslint-disable-next-line
export default () => {

    const depositSuccessPopup = useSelector(state => state.popup.depositSuccess)
    const location = useLocation()

    const { t } = useTranslation(['deposit'])

    useEffect(() => {
        if(depositSuccessPopup){
            window.history.pushState('', '', '/deposit/success')
        } else {
            window.history.pushState('', '', location.pathname)
        }
        //eslint-disable-next-line
    }, [depositSuccessPopup])

    return (
        <Popup popup={depositSuccessPopup} handler={hideDepositSuccess} className={'deposit-success'}>
            <img src={success} alt="" />
            <div className="deposit-success-header">{t('deposit:success')}</div>
            <div className="deposit-success-title">{t('deposit:backToGames')}</div>
        </Popup>
    )
}