import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import './Popup.scss'

import {ReactComponent as Close } from '../../assets/close.svg'
//eslint-disable-next-line
export default ({ children, popup, handler = null, className, disabled, mobile = false }) => {

    const dispatch = useDispatch()

    const banner = useSelector(state => state.app.banner)

    const popupRef = useRef()

    useEffect(() => {
        const click = event => !event.target.classList.contains('popup') || (handler && !disabled ? dispatch(handler()) : false)
        document.addEventListener('mousedown', click)
        return () => document.removeEventListener('mousedown', click)
        //eslint-disable-next-line
    }, [])

    if(!popup) return false

    return (
        <div className={"popup " + (banner ? 'banner-popup ' : '') + (popup ? 'active ' : '') + (mobile ? 'mobile ' : '')} ref={popupRef}>
            <div className={"popup-content " + className}>
                <Close className="close-popup" onClick={() => handler && !disabled ?  dispatch(handler()) : false}/>
                {children}
            </div>
        </div>
    )
}