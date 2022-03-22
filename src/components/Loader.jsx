import React from 'react'
import { useSelector } from 'react-redux'

import { ReactComponent as Logo } from '../assets/logo.svg'

import './Loader.scss'
//eslint-disable-next-line
export default () => {

    const loader = useSelector(state => state.app.loader)

    return <div className={"loader " + (loader ? 'disable' : '')}>
        <Logo/>
        {/* <div className="lds-ripple"><div></div><div></div></div> */}
    </div>
}