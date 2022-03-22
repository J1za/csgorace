import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import {ReactComponent as Close } from '../assets/close.svg'
import { hideBanner } from '../redux/actions'

import './Banner.scss'

export default function Banner () {

    const banner = useSelector(state => state.app.banner)
    const message = useSelector(state => state.app.server?.warning)
    const dispatch = useDispatch()

    return <div className={"banner-wrapper " + (!banner || !message ? 'hidden' : '')}>
        <div className="banner">
            <div className="banner-message">{message}</div>
            <Close onClick={() => dispatch(hideBanner())}/>
        </div>
    </div>
}
