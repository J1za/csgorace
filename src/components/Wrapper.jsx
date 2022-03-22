import React, { useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeNav } from '../redux/actions'
// import { useTranslation } from 'react-i18next'

import Header from './Header'
// import Banner from './Banner'
import Nav from './Nav'
import Chat from './Chat'

import SmoothVerticalScrolling from '../utilites/scroll'

import { ReactComponent as Streetrace } from '../assets/games/streetrace.svg'
import { ReactComponent as Crash } from '../assets/games/crash.svg'
import { ReactComponent as Roulette } from '../assets/games/roulette.svg'
import { ReactComponent as Racing } from '../assets/games/racing.svg'

import './Wrapper.scss'
//eslint-disable-next-line
export default ({children}) => {

    const location = useLocation()
    const dispatch = useDispatch()
    const page = useRef()
    const banner = useSelector(state => state.app.banner)
    const showTrack = useSelector(state => state.race.showTrack)
    const user = useSelector(state => state.app.user)
    const message = useSelector(state => state.app.server?.warning)

    useEffect(() => {
        if(showTrack && page?.current){
            // SmoothVerticalScrolling(page?.current, 1000, 'top')
            page?.current.scrollTo({
                top: 0
            })
        }
    }, [showTrack])

    useEffect(() => {
        dispatch(changeNav(location.pathname.includes('ticket') || location.pathname.includes('faq')  ? 4 : location.pathname.includes('tot') ? 1 : location.pathname.includes('free') ? 2 : location.pathname.includes('refferals') ? 3 : (location.pathname === '/' || location.pathname === '/streetrace' || location.pathname === '/crash' || location.pathname === '/race' || location.pathname === '/roulette') ? 0 : null))
        //eslint-disable-next-line
    }, [location])

    return (
        <div className={"wrapper " + user?.language}>
            <Header/>
            {/* <Banner/> */}
            <div className={"wrapper-content " + (banner && message ? 'banner-wrapper-content' : '')}>
                <Nav/>
                <div className={"wrapper-content-body "} ref={page}>
                    {children}
                </div>
                <Chat/>
            </div>
            <ul className="wrapper-mobile">
                <li>
                    <Link to="/streetrace" className={location.pathname.includes('/streetrace') ? 'active' : ''}>
                        <Streetrace/>
                        <span>Streetrace</span>
                    </Link>
                </li>
                <li>
                    <Link to="/race" className={location.pathname.includes('/race') ? 'active' : ''}>
                        <Racing/>
                        <span>Race</span>
                    </Link>
                </li>
                <li>
                    <Link to="/crash" className={location.pathname.includes('/crash') ? 'active' : ''}>
                        <Crash/>
                        <span>Crash</span>
                    </Link>
                </li>
                <li>
                    <Link to="/roulette" className={location.pathname.includes('/roulette') ? 'active' : ''}>
                        <Roulette/>
                        <span>Roulette</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}