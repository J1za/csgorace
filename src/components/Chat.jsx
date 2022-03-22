import React, { useState, useRef, useEffect } from 'react'

import { useLocation } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, showChat, showChatRules, showDeposit, hidePay } from '../redux/actions'
import { useTranslation } from 'react-i18next'
import socket from '../utilites/sockets'
import SmoothVerticalScrolling from '../utilites/scroll'

import Message from './Message'
import ButtonYellow from './ButtonYellow'

import './Chat.scss'

import { ReactComponent as Arrow } from '../assets/arrow-right.svg'
import { ReactComponent as Chat } from '../assets/chat.svg'
import { ReactComponent as Send } from '../assets/send.svg'

import { ReactComponent as Close } from '../assets/close.svg'

import { ReactComponent as Wallet } from '../assets/wallet.svg'
import { ReactComponent as Online } from '../assets/online.svg'
//eslint-disable-next-line
export default () => {

    const [message, setMessage] = useState('')
    const [ isUserScroll, setIsUserScroll ] = useState(false)
    const [messagesLocal, setMessagesLocal] = useState(0)
    const chat = useRef()

    const location = useLocation()

    const dispatch = useDispatch()
    const messages = useSelector(state => state.chat.messages)
    const streamer = useSelector(state => state.app.streamer)
    // const newMessagesCount = useSelector(state => state.chat.newMessagesCount)
    const collapse = useSelector(state => state.chat.chat)
    const user = useSelector(state => state.app.user)
    const banner = useSelector(state => state.app.banner)
    const online = useSelector(state => state.app.online)
    const hidePayVar = useSelector(state => state.app.hidePay)
    const { t } = useTranslation(['main'])

    const scrollToTopChat = (element) => {
        setTimeout(() => {
            if(!isUserScroll && element){
                // SmoothVerticalScrolling(element, 1000, 'bottom')
                element.scrollTo({
                    top: 10000
                })
            }
        }, 200)
    }

    const sendMessageHandler = event => {
        event.preventDefault()
        dispatch(sendMessage(message))
        setMessage('')
    }

    useEffect(() => {
        if(messagesLocal < messages.length){
            scrollToTopChat(chat.current)
        }
        setMessagesLocal(messages.length)
        //eslint-disable-next-line
    }, [messages])

    useEffect(() => {
        socket.on('chatMsg', () => scrollToTopChat(chat.current))
        scrollToTopChat(chat.current)
    }, [])

    return (
        <div className={"chat " + (banner ? 'banner-chat ' : '') + (hidePayVar ? 'full ' : '') + (collapse ? 'collapse ' : '')  + (location.pathname.includes('withdraw') ? 'none ' : '')}>
            <div className={"chat-pay " + (hidePayVar ? 'hidden' : '')}>
                <Close className='chat-pay-close' onClick={() => dispatch(hidePay())}/>
                <span>{t('main:payBalance')}</span>
                <ButtonYellow onClick={() => dispatch(showDeposit())}>{t('main:pay')}</ButtonYellow>
                <Wallet className="chat-pay-image" />
            </div>
            <div className={"chat-body "}>
                <div className="chat-body-header">
                    <div className="chat-title">
                        <Chat/>
                        <span>{t('main:chat')}</span>
                    </div>
                    <div className="chat-rules">
                        <span onClick={() => dispatch(showChatRules())}>{t('main:rules')}</span>
                        <button onClick={() => dispatch(showChat())}><Arrow/></button>
                    </div>
                </div>
                <div className="chat-body-online">
                    <Online/>
                    <div className="count">{online}</div>
                    <span>{t('online')}</span>
                </div>
                <div className={"chat-body-messages " + (streamer ? 'streamer' : '')} ref={chat} onScroll={() => setIsUserScroll(true)} onClick={event => streamer ? (() => {
                    event.preventDefault()                    
                    event.stopPropagation()
                })() : false}>
                    <div className="chat-body-messages-list">
                        {messages.map(item => <Message message={item} key={item.i} onClick={() => setMessage(prev => prev + '@' + item.n + ' ')} />)}
                    </div>
                </div>
                <form className="chat-body-send"  onSubmit={sendMessageHandler}>
                    <input type="text" placeholder={t('main:chatSend')} value={message} onChange={event => setMessage(event.target.value)} disabled={!user || user?.permissions?.bannedChat || user?.permissions?.mutedChat } />
                    <button type="submit" disabled={!user || user?.permissions?.bannedChat || user?.permissions?.mutedChat }>
                        <Send/>
                    </button>
                </form>
            </div>
        </div>
    )
}