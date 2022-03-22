import React, { useEffect } from 'react'




import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { DOMAIN } from '../utilites/api'

import { changeNav, showDeposit } from '../redux/actions'

import Account from './Account'
import ButtonYellow from './ButtonYellow'

import { ReactComponent as Twitter } from '../assets/social/tw.svg'
import { ReactComponent as Instagram } from '../assets/social/in.svg'
import { ReactComponent as Telegram } from '../assets/social/tg.svg'
import { ReactComponent as Vk } from '../assets/social/vk.svg'
import { ReactComponent as Steam } from '../assets/steam.svg'

import './Nav.scss'
//eslint-disable-next-line
export default () => {

    const { t } = useTranslation(['main', 'profile'])

    const user = useSelector(state => state.app.user)
    const nav = useSelector(state => state.nav.nav)
    const banner = useSelector(state => state.app.banner)

    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(changeNav(location.pathname.includes('ticket') || location.pathname.includes('faq')  ? 4 : location.pathname.includes('tot') ? 1 : location.pathname.includes('free') ? 2 : location.pathname.includes('refferals') ? 3 : (location.pathname === '/' || location.pathname === '/streetrace' || location.pathname === '/crash' || location.pathname === '/race' || location.pathname === '/roulette') ? 0 : null))
        //eslint-disable-next-line
    }, [location])

    return (
        <div className={"nav " + (banner ? 'banner-nav' : '')}>
            <div className="nav-menu">
                {user ? <Account/> : <a href={`${DOMAIN}auth/steam`} className={"account-btn"}>
                    <Steam/>
                    <span>Login with steam</span>
                </a> }
                <div className="nav-menu-btns-links">
                    <Link to="/withdraw" className="nav-menu-btns-links-cash">{t('profile:cashOut')}</Link>
                    <ButtonYellow onClick={() => dispatch(showDeposit())} className="nav-menu-btns-links-deposit">{t('profile:deposit')}</ButtonYellow>
                </div>
                <ul className="nav-menu-list">
                    {nav.map((item, index) => (
                        item.refferal && !user ? '' : <li className={"nav-menu-list-item " + (item.active ? 'active' : '')} key={index}>
                            <Link to={!item.refferal ? ( item.link || '/') : '/profile/' + user?.steamId + item.link}> {item.icon}  <span>{t('main:header.' + item.translate)}</span> </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="nav-links">
                <Link className="nav-links-item" to="/fair"><span>{t('main:footer.fair')}</span></Link>
                <Link className="nav-links-item" to="/privacy"><span>{t('main:footer.privacy')}</span></Link>
                <Link className="nav-links-item" to="/tos"><span>{t('main:footer.terms')}</span></Link>
                <Link className="nav-links-item" to="/faq"><span>{t('main:footer.faq')}</span></Link>
            </div>
            <div className="nav-social">
                <a className={'nav-social-item'} rel="noreferrer" href={user?.language === 'ru' ? 'https://twitter.com/csgorace_ru' : 'https://twitter.com/csgorace_en'} target="_blank"><Twitter/></a>
                <a className={'nav-social-item'} rel="noreferrer" href="tg://resolve?domain=csgorace" target="_blank"><Telegram/></a>
                <a className={'nav-social-item'} href="https://www.instagram.com/csgorace_official/" rel="noreferrer" target="_blank" ><Instagram/></a>
                <a className={'nav-social-item'} href="https://vk.com/csgorace_official" rel="noreferrer" target="_blank" ><Vk/></a>
            </div>
            <div className="nav-rights">
                {t('main:rights')}
            </div>
        </div>
    )
}