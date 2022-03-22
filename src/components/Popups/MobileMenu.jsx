import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux' 

import { useTranslation } from 'react-i18next'

import { changeLang, changeNav, hideMobileMenu } from '../../redux/actions'

import Popup from './Popup'
import Account from '../Account'

import { ReactComponent as Twitter } from '../../assets/social/tw.svg'
import { ReactComponent as Instagram } from '../../assets/social/in.svg'
import { ReactComponent as Telegram } from '../../assets/social/tg.svg'
import { ReactComponent as Vk } from '../../assets/social/vk.svg'


import './MobileMenu.scss'
//eslint-disable-next-line
export default () => {

    const { i18n, t } = useTranslation(['main'])
    

    const mobileMenu = useSelector(state => state.popup.mobileMenu)
    const user = useSelector(state => state.app.user)
    const nav = useSelector(state => state.nav.nav)


    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(changeNav(location.pathname.includes('ticket') || location.pathname.includes('faq')  ? 4 : location.pathname.includes('tot') ? 1 : location.pathname.includes('free') ? 2 : location.pathname.includes('refferals') ? 3 : (location.pathname === '/' || location.pathname === '/streetrace' || location.pathname === '/crash' || location.pathname === '/race' || location.pathname === '/roulette') ? 0 : null))
        //eslint-disable-next-line
    }, [location])

    return (
        <Popup popup={mobileMenu} handler={hideMobileMenu} className={'mobile-menu'} mobile={true}>
            <div className="mobile-menu-menu">
                <Account mobile={true}/>
                <ul className="mobile-menu-menu-list">
                    {nav.map((item, index) => (
                        item.refferal && !user ? '' : <li onClick={() => dispatch(hideMobileMenu())} className={"mobile-menu-menu-list-item " + (item.active ? 'active' : '')} key={index}>
                            <Link to={!item.refferal ? (item.link || '/') : '/profile/' + user?.steamId + item.link}> {item.icon}  <span>{t('main:header.' + item.translate)}</span> </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mobile-menu-social">
                <div className="lang">
                    <span onClick={() => {
                        dispatch(changeLang('ru'))
                        i18n.changeLanguage('ru')
                    }} className={user?.language === 'ru' || i18n.language === 'ru' ? 'active' : ""}>RUS</span>
                    <span onClick={() => {
                        dispatch(changeLang('en'))
                        i18n.changeLanguage('en')
                    }} className={user?.language === 'en' || i18n.language === 'en' ? 'active' : ""}>ENG</span>
                </div>
                <div className="links">
                    <a className={'mobile-menu-social-item'} rel="noreferrer" href={user?.language === 'ru' ? 'https://twitter.com/csgorace_ru' : 'https://twitter.com/csgorace_en'} target="_blank"><Twitter/></a>
                    <a className={'mobile-menu-social-item'} rel="noreferrer" href="tg://resolve?domain=csgorace" target="_blank"><Telegram/></a>
                    <a className={'mobile-menu-social-item'} href="https://www.instagram.com/csgorace_official/" rel="noreferrer"  target="_blank"><Instagram/></a>
                    <a className={'mobile-menu-social-item'} href="https://vk.com/csgorace_official" rel="noreferrer"  target="_blank"><Vk/></a>
                </div>
            </div>
            <div className="mobile-menu-links">
                <Link onClick={() => dispatch(hideMobileMenu())} className="mobile-menu-links-item" to="/fair"><span>{t('main:footer.fair')}</span></Link>
                <Link onClick={() => dispatch(hideMobileMenu())} className="mobile-menu-links-item" to="/privacy"><span>{t('main:footer.privacy')}</span></Link>
                <Link onClick={() => dispatch(hideMobileMenu())} className="mobile-menu-links-item" to="/tos"><span>{t('main:footer.terms')}</span></Link>
                <Link onClick={() => dispatch(hideMobileMenu())} className="mobile-menu-links-item" to="/faq"><span>{t('main:footer.faq')}</span></Link>
            </div>
        </Popup>
    )
}