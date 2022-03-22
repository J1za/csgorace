import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'
import { showTicketCreatePopup, getTicketsHandler } from '../redux/actions'
import { questionsData } from '../utilites/temp'

import ButtonYellow from '../components/ButtonYellow'

import { ReactComponent as Plus } from '../assets/plus.svg'
import { ReactComponent as Ticket } from '../assets/ticket.svg'
import { ReactComponent as Arrow } from '../assets/arrow-right.svg'

import './Support.scss'
//eslint-disable-next-line
export default () => {

    const dispatch = useDispatch()
    const allCount = useSelector(state => state.ticket.tickets.length)
    const activeCount = useSelector(state => state.ticket.tickets.filter(item => item.status === 0).length)
    const resolvedCount = useSelector(state => state.ticket.tickets.filter(item => item.status === 1).length)
    const user = useSelector(state => state.app.user)

    const [questions, setQuestions ] = useState(questionsData)

    const { i18n, t } = useTranslation(['tickets'])

    useEffect(() => {
        dispatch(getTicketsHandler())
        //eslint-disable-next-line
    }, [])

    return (
        <div className="support">
            <h1 className="support-header">{t('tickets:support')}</h1>
            <div className="support-body">
                <div className="support-body-content">
                    {user?.language || i18n.language  ? questions.map(item => <div className={"support-item " + (item.open ? 'active' : '')} key={item.id} onClick={() => setQuestions(prev => prev.map(faq => ({...faq, open: item.id === faq.id ? !faq.open : false })))}>
                        <div className="support-item-header">
                            <span>{item[user?.language || i18n.language ].title}</span>
                            <div className="plus">
                            <Plus/>
                            </div>
                        </div>
                        <div className="support-item-body">{item[user?.language  || i18n.language].answer}</div>
                    </div>) : ''}
                </div>
                { user ? <div className="support-body-nav">
                    <Link to="/tickets/all"><Ticket/>{t('tickets:yourTickets')}<Arrow/></Link>
                    <ul className="support-body-nav-list">
                        <li className="support-body-nav-list-item">
                            <Link to="/tickets/active">
                                <span>{t('tickets:activeTickets')}</span>
                                <span className="count count-active">{activeCount}</span>
                            </Link>
                        </li>
                        <li className="support-body-nav-list-item">
                            <Link to="/tickets/resolved">
                                <span>{t('tickets:resolvedTickets')}</span>
                                <span className="count">{resolvedCount}</span>
                            </Link>
                        </li>
                    </ul>
                    <ButtonYellow className={'create-ticket'} onClick={() => dispatch(showTicketCreatePopup())}>{t('tickets:createTicket')}</ButtonYellow>
                </div> : '' }
            </div>
        </div>
    )
}