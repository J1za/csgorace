import React from 'react'

import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import './Hash.scss'

export default function Hash ({ hash = '' }) {

    const { t } = useTranslation(['crash'])

    const latency = useSelector(state => state.app.serverLatency)

    return <div className="hash">
        {t('crash:hash')}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{hash}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{t('crash:latency')} <span className={"latency " + (latency > 1000 ? 'red' : latency > 500 ? 'orange' : 'green')}></span>
    </div>
}