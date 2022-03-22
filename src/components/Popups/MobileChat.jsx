import React, { useEffect, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux' 

import { showChatRules, sendMessage, hideMobileChat } from '../../redux/actions'
import socket from '../../utilites/sockets'
import SmoothVerticalScrolling from '../../utilites/scroll'

import { useTranslation } from 'react-i18next'

import Message from '../Message'
import Popup from './Popup'

import { ReactComponent as Online } from '../../assets/online.svg'
import { ReactComponent as Chat } from '../../assets/chat.svg'
import { ReactComponent as Send } from '../../assets/send.svg'

import './MobileChat.scss'
//eslint-disable-next-line
export default () => {

    const { t } = useTranslation(['main'])
    
    const [message, setMessage] = useState('')

    const messages = useSelector(state => state.chat.messages)
    const mobileChat = useSelector(state => state.popup.mobileChat)
    const user = useSelector(state => state.app.user)
    const online = useSelector(state => state.app.online)

    const chat = useRef()

    const sendMessageHandler = event => {
        event.preventDefault()
        dispatch(sendMessage(message))
        setMessage('')
    }
    
    const scrollToTopChat = (element) => {
        setTimeout(() => {
            if(element){
                // SmoothVerticalScrolling(element, 1000, 'bottom')
                element.scrollTo({
                    top: 10000
                })
            }
        }, 200)
    }

    useEffect(() => {
        if(mobileChat){
            scrollToTopChat(chat.current)
        }
    }, [mobileChat])


    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('chatMsg', () => scrollToTopChat(chat.current))
        scrollToTopChat(chat.current)
    }, [])


    return (
        <Popup popup={mobileChat} handler={hideMobileChat} className={'mobile-chat'} mobile={true}>
            <div className="mobile-chat-header">
                <div className="texts">
                    <div className="chat-title">
                        <Chat/>
                        <span>{t('main:chat')}</span>
                    </div>
                    <div className="chat-rules">
                        <span onClick={() => dispatch(showChatRules())}>{t('main:rules')}</span>
                    </div>
                </div>
                <div className="online">
                    <Online/>
                    <div className="count">{online}</div>
                    <span>{t('main:online')}</span>
                </div>
            </div>
            <div className="mobile-chat-messages" ref={chat}>
                <div className="mobile-chat-messages-list">
                    {messages.map(item => <Message message={item} key={item.i} onClick={() => setMessage(prev => prev + '@' + item.n + ' ')} />)}
                </div>
            </div>
            <form className="mobile-chat-send"  onSubmit={sendMessageHandler}>
                <input type="text" placeholder={t('main:chatSend')} value={message} onChange={event => setMessage(event.target.value)} disabled={!user || user?.permissions?.bannedChat || user?.permissions?.mutedChat } />
                <button type="submit" disabled={!user || user?.permissions?.bannedChat || user?.permissions?.mutedChat }>
                    <Send/>
                </button>
            </form>
        </Popup>
    )
}