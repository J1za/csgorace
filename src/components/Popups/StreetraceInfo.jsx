import React from 'react'

import { useSelector, useDispatch } from 'react-redux' 
import { hideStreetraceInfo } from '../../redux/actions'

import { useTranslation } from 'react-i18next'


import Popup from './Popup'

import './StreetraceInfo.scss'

export default function StreetraceInfo() {

    const { t } = useTranslation(['streetrace'])

    const streetraceInfo = useSelector(state => state.popup.streetraceInfo)
    const dispatch = useDispatch()

    return (
        <Popup popup={streetraceInfo} className={'streetrace-info'} handler={() => dispatch(hideStreetraceInfo())}>
            <div className="streetrace-info-header">{t('streetrace:streetrace')}</div>
            <p className="streetrace-info-body">
                <span>{t('streetrace:info.p1')}</span>
            </p>
        </Popup>
    )
}