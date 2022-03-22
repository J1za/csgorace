import React, { useEffect, useRef } from 'react'

import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'
import { changeTicketMessage, clearTicketHandler, closeTicketHandler, getTicketHandler, sendTicketMessageHandler } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import SmoothVerticalScrolling from '../utilites/scroll'

// import CloseBtn from  '../components/CloseBtn'
// import BackBtn from  '../components/BackBtn'
// import OrangeBtn from  '../components/OrangeBtn'

import { ReactComponent as Send } from '../assets/send.svg'
import { ReactComponent as Back } from '../assets/back-button.svg'

import './Ticket.scss'

//eslint-disable-next-line
export default () => {

    const { t } = useTranslation(['tickets'])
    const { id } = useParams()

    const dispatch = useDispatch()
    const ticket = useSelector(state => state.ticket.ticket)
    const user = useSelector(state => state.app.user)
    const streamer = useSelector(state => state.app.streamer)
    const banner = useSelector(state => state.app.banner)
    const ticketMessage = useSelector(state => state.ticket.ticketMessage)
    const router = useHistory()
    const messages = useRef()

    const scrollToTopChat = element => {
        setTimeout(() => {
            // SmoothVerticalScrolling(element, 1000, 'bottom')
            element.scrollTo({
                top: 10000
            })
        }, 200)
    }


    const sendMessage = event => {
        event.preventDefault()
        dispatch(sendTicketMessageHandler({ id: +id, msg: ticketMessage }))
        scrollToTopChat(messages.current)
    }


    useEffect(() => {
        dispatch(getTicketHandler(id))
        return () => dispatch(clearTicketHandler())
        //eslint-disable-next-line
    }, [])

    return (
        <div className="ticket">
            <div className="ticket-header">
                {ticket ? <h2> <Back onClick={() => router.goBack()}/> {t('tickets:ticket')} #{id}</h2> : ''}
                <div className="ticket-header-data">
                    { ticket?.messages && ticket?.messages[0] && ticket?.messages[0].avatar ? <div className="operator">
                        <div className="operator-image">
                            <img src={ticket?.messages[0].avatar} alt="" className={streamer ? 'streamer' : ''} />
                        </div>
                        <div className="operator-info">
                            <div className="name">{ticket?.messages[0].nick}</div>
                            <span>{t('tickets:operator')}</span>
                        </div>
                    </div> : <div></div> }
                    { ticket && ticket?.status !== 0 ? <button onClick={() => dispatch(closeTicketHandler(id))}>{t('tickets:closeTicket')}</button> : '' }
                </div>
            </div>
            {ticket ? <div className="ticket-body">
                <ul className={"ticket-body-messages " + (banner ? 'banner' : '')} ref={messages}>
                    {ticket?.messages.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.user ? <li className="message is-me">
                                <div className="message-content">
                                    { user.profileAvatar ? <div className="message-content-image-wrapper">
                                        <div className="message-content-image">
                                            <img src={user.profileAvatar} className={streamer ? 'streamer' : ''} alt=""/> 
                                        </div>
                                    </div> : '' }
                                    <div className="message-content-name">{user.nickname} <span>{item.userTime ? (new Date(item.userTime).getDate() < 10 ? '0' + new Date(item.userTime).getDate() : new Date(item.userTime).getDate()) + '.' +  (new Date(item.userTime).getMonth() + 1 < 10 ? '0' + (new Date(item.userTime).getMonth() + 1)  : new Date(item.userTime).getMonth()) + '.' + new Date(item.userTime).getFullYear() + ' ' + (new Date(item.userTime).getHours() < 10 ? '0' + new Date(item.userTime).getHours() : new Date(item.userTime).getHours()) + ':' +  (new Date(item.userTime).getMinutes() < 10 ? '0' + new Date(item.userTime).getMinutes() : new Date(item.userTime).getMinutes()) : ''}</span></div>
                                </div>
                                <div className="message-text">{item.user}</div>
                            </li> : '' }
                            {item.support ? <li className="message">
                                <div className="message-content">
                                    <div className="message-content-image">
                                    { item.avatar ? <img src={item.avatar} className={streamer ? 'streamer' : ''} alt=""/> : '' }
                                    </div>
                                    <div className="message-content-name">{item.nick}<span>{item.supportTime ? (new Date(item.supportTime).getDate() < 10 ? '0' + new Date(item.supportTime).getDate() : new Date(item.supportTime).getDate()) + '.' +  (new Date(item.supportTime).getMonth() + 1 < 10 ? '0' + (new Date(item.supportTime).getMonth() + 1)  : new Date(item.supportTime).getMonth()) + '.' + new Date(item.supportTime).getFullYear() + ' ' + (new Date(item.supportTime).getHours() < 10 ? '0' + new Date(item.supportTime).getHours() : new Date(item.supportTime).getHours()) + ':' +  (new Date(item.supportTime).getMinutes() < 10 ? '0' + new Date(item.supportTime).getMinutes() : new Date(item.supportTime).getMinutes()) : ''}</span></div>
                                </div>
                                <div className="message-text">{item.support}</div>
                            </li> : '' }
                        </React.Fragment>
                    ))}
                </ul>
            </div> : ''}
            <form className="ticket-form" onSubmit={sendMessage}>
                <div className="ticket-form-avatar">
                    <img src={user.profileAvatar} className={streamer ? 'streamer' : ''} alt="" /> 
                </div>
                <div className="ticket-form-input">
                    <input type="text" value={ticketMessage} onChange={event => dispatch(changeTicketMessage(event.target.value))} placeholder={t('tickets:yourMessage')} />
                    <button type="submit"><Send/></button>
                </div>
            </form>
        </div>
    )
}