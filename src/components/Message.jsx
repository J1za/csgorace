import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { banUserHandler, changeMuteHours, hideMobileChat, hideMute, muteUserHandler, sendDeleteMessage, showError, showMute } from '../redux/actions'

import { ReactComponent as Ban } from '../assets/ban.svg'
import { ReactComponent as Mute } from '../assets/mute.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import { ReactComponent as Close } from '../assets/close.svg'
import { ReactComponent as Check } from '../assets/check.svg'

import { ReactComponent as Fire1 } from '../assets/fire1.svg'
import { ReactComponent as Fire2 } from '../assets/fire2.svg'

import './Message.scss'
//eslint-disable-next-line
export default ({ message, onClick = () => false }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)
    const mute = useSelector(state => state.popup.mute)
    const muteData = useSelector(state => state.popup.muteData)
    const menu = useRef();
    const [animate, setAnimate] = useState(false)
    const [ open, setOpen ] = useState(false)
    const { t } = useTranslation(['main'])
    const history = useHistory()

    
    const clickHandler = event => {
        return menu.current?.contains(event.target) || setOpen(false)
    }

    useEffect(() => {
        if(animate){
            setTimeout(() => {
                setAnimate(false)
            }, 1000)
        }
        //eslint-disable-next-line
    }, [animate])

    useEffect(() => {
        document.addEventListener('click', clickHandler)
        return () => {
            document.removeEventListener('click', clickHandler)
        }
    }, []);

    return (
        <div className={"message " + (animate ? 'animate ' : '') +  (open ? 'active ' : '') + ((user && message.s_i === user?.steamId) ? 'is-me ' : '') + (message.s > 2 ? 'gold ' : '') + (message.s === 2 ? 'youtube ' : '') + (streamer && message.s_i !== user?.steamId ? 'streamer' : '')} onClick={() => {
            onClick()
            setAnimate(true)
        }}>
            <div className="message-image">
                <Link to={'/profile/' + message.s_i} className={(message.l < 10 ? 'grey' : message.l < 20 ? 'blue' : message.l < 40 ? 'yellow' : message.l < 60 ? 'orange' : message.l < 80 ? 'violet' : message.l < 90 ? 'red' : message.l <= 100 ? 'fire' : '' )} onClick={event => event.stopPropagation()}>
                    {/* <img src={message.a} alt="avatar" className={streamer && user?.steamId !== message.s_i  ? 'streamer' : ''} /> */}
                    <img src={message.a} alt="avatar" />
                </Link>
                <div className="message-time">{message.d}</div>
            </div>
            <div className="message-data">
                <div className={"message-data-username"} id={message.i} ref={menu} >
                    {user && message.s_i === user?.steamId ? (message.s >= 2 ? <span className={message.s === 2 ? 'message-data-youtube' : 'message-data-admin'}>{message.s === 2 ? 'YouTube' : message.s === 3 ? 'Moderator' : (message.s > 4 && message.s) < 8 ? 'Support' : message.s === 8 ? 'Staff' :  message.s === 9 ? 'Admin' : message.s === 10 ? 'Owner' : ''}</span> : <span className={"message-data-level " + (message.l < 10 ? 'grey' : message.l < 20 ? 'blue' : message.l < 40 ? 'yellow' : message.l < 60 ? 'orange' : message.l < 80 ? 'violet' : message.l < 90 ? 'red' : message.l <= 100 ? 'fire' : '' )}>{message.l >= 90 ? <><Fire1/><Fire2/></> : ''} <span>{message.l}</span> </span>) : '' }
                    <div className={"name-wrapper " + (message.s >= 2 ? 'cut' : "")} onClick={event => {
                        // event.stopPropagation()
                        return user?.permissions.status < 2 ? history.push('/profile/' + message.s_i) : (message.i === +menu.current?.id ? setOpen(prev => !prev) : setOpen(false))
                    }}>
                        {/* {streamer && message.s_i !== user?.steamId ? '*'.repeat( message.n.length) : message.n} */}
                        {message.n}
                    </div>
                    {user && message.s_i !== user?.steamId ? (message.s >= 2 ? <span className={message.s === 2 ? 'message-data-youtube' : 'message-data-admin'}>{message.s === 2 ? 'YouTube' : message.s === 3 ? 'Moderator' : (message.s > 4 && message.s) < 8 ? 'Support' : message.s === 8 ? 'Staff' :  message.s === 9 ? 'Admin' : message.s === 10 ? 'Owner' : ''}</span> : <span className={"message-data-level " + (message.l < 10 ? 'grey' : message.l < 20 ? 'blue' : message.l < 40 ? 'yellow' : message.l < 60 ? 'orange' : message.l < 80 ? 'violet' : message.l < 90 ? 'red' : message.l <= 100 ? 'fire' : '' )}>{message.l >= 90 ? <><Fire1/><Fire2/></> : ''}<span>{message.l}</span></span>) : '' }
                    {user?.permissions.status >= 2 ? <div onClick={event => event.stopPropagation()} className={"message-data-menu " + (menu.current?.getBoundingClientRect().bottom + 300 > window.innerHeight ? 'reverse ' : '') +  (open ? 'active' : '')}>
                        <Close className={'close'} onClick={() => setOpen(prev => !prev)}/>
                        <Link to={'/profile/' + message.s_i} onClick={() => dispatch(hideMobileChat())}>
                            <div className="image">
                                <img src={message.a} alt="" className={streamer && user?.steamId !== message.s_i  ? 'streamer' : ''}/>
                            </div>
                            <div className="name">
                                {/* {streamer && message.s_i !== user?.steamId ? '*'.repeat( message.n.length) : message.n} */}
                                {message.n}
                            </div>
                        </Link>
                        { user?.permissions.status >= 3 && message.n !== user?.nickname ? <span className="ban" onClick={() => dispatch(banUserHandler(message.s_i))}><Ban/>{t('main:chatMenu.ban')}</span> : '' }
                        { user?.permissions.status >= 2 && message.n !== user?.nickname ? <span onClick={() => user?.permissions.status === 2 ? dispatch(muteUserHandler({mute: message.s_i, hours: 1})) : (mute ? dispatch(hideMute()) : dispatch(showMute(message.s_i)))}><Mute/>{t('main:chatMenu.mute')}</span> : '' }
                        { message.n !== user?.nickname ? <div className={"mute-menu " + (mute ? 'active' : '')}>
                            <div className="input">
                                <div className="title">{t('main:chatMenu.count')}</div>
                                <input type="text" value={muteData.hours} onChange={event => dispatch(changeMuteHours(event.target.value))} />
                            </div>
                            <Check onClick={event => {
                                event.preventDefault()
                                if(+muteData.hours === 0) {
                                    dispatch(showError({text: 'Enter hours', translate: false}))
                                } else {
                                    dispatch(muteUserHandler({ mute: muteData.mute, hours: +muteData.hours }))
                                }
                            }}/>
                        </div> : ''}
                        { user?.permissions.status >= 2 ? <span onClick={() => user?.permissions.status >= 2 ? dispatch(sendDeleteMessage(message.i)) : false}><Delete/>{t('main:chatMenu.delete')}</span> : '' }
                    </div> : '' }
                </div>
                <div className="message-data-text">
                    {/* {streamer && message.s_i !== user?.steamId ? '****************' : message.t} */}
                    {message.t}
                </div>
            </div>
        </div>
    )
}