import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import { ReactComponent as Error } from '../assets/error.svg'
import { ReactComponent as Success } from '../assets/success.svg'

import './Error.scss'
//eslint-disable-next-line
export default () => {

    const error = useSelector(state => state.app.error)

    const { t } = useTranslation(['errors'])

    if(!error.show) return false

    return (
        <div className={"error " + (error.show ? 'error-active ' : '') + (error.data?.success ? 'success' : '')}>
            {error.data?.success ? <Success/> : <Error/> }{error.data.translate ? t(error.data.text) : error.data.text}
        </div>
    )
}