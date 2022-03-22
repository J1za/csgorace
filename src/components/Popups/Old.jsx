import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Popup from './Popup'

import { changeOld, hideOld } from '../../redux/actions'
import { DOMAIN } from '../../utilites/api'

import { ReactComponent as Steam } from '../../assets/steam.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as Check } from '../../assets/check.svg'

import './Old.scss'

//eslint-disable-next-line
export default () => {

    const oldPopup = useSelector(state => state.popup.old)
    const old = useSelector(state => state.app.old)
    const [check, setCheck] = useState(false)

    const dispatch = useDispatch()


    const { t } = useTranslation(['main'])


    return (
        <Popup popup={oldPopup} handler={hideOld} disabled={!old || !check } className={'old ' + (!old || !check  ? 'disabled' : '')}>
            <div className="old-body">
                <Logo/>
                <div className="title">{t('main:old')}</div>
            </div>
            <div className="old-nav">
                <div className="old-nav-check" onClick={() => dispatch(changeOld())}>
                    <div className={"check " + (old ? 'active' : '')}>
                        <span><Check/></span>
                    </div>
                    <span>{t('main:older')}</span>
                </div>
                <div className="accept-check" onClick={() => setCheck(prev => !prev)}>
                    <div className={"check " + (check ? 'active' : '')}>
                        <span><Check/></span>
                    </div>
                    <div className="title">{t('main:acceptBtn')} <a href="/tos" target={'_blank'}>{t('main:footer.terms')}</a> </div>
                </div>
                <a href={`${DOMAIN}auth/steam`} className={"account-btn " + (!old || !check ? 'disabled' : '' )} onClick={event => !old || !check  ? event.preventDefault() : false}>
                    <Steam/>
                    <span>Login with steam</span>
                </a>
            </div>
        </Popup>
    )
}