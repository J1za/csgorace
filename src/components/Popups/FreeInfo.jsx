import React from 'react'

import { useSelector, useDispatch } from 'react-redux' 
import { hideFreeInfo } from '../../redux/actions'

import { useTranslation } from 'react-i18next'


import Popup from './Popup'

import './FreeInfo.scss'

export default function FreeInfo() {

    const { t } = useTranslation(['free'])

    const freeInfo = useSelector(state => state.popup.freeInfo)
    const dispatch = useDispatch()

    return (
        <Popup popup={freeInfo} className={'free-info'} handler={() => dispatch(hideFreeInfo())}>
            <div className="free-info-header">{t('free:garage')}</div>
            <p className="free-info-body">
                <span>{t('free:info.p1')}</span>
            </p>
        </Popup>
    )
}