import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTicketsHandler, showTicketCreatePopup } from '../redux/actions'

import { useTranslation } from 'react-i18next'

import { ReactComponent as Ticket } from '../assets/ticket.svg'
import { ReactComponent as Arrow } from '../assets/arrow-right.svg'
import { ReactComponent as Back } from '../assets/back-button.svg'

import ButtonYellow from '../components/ButtonYellow'

import './Tickets.scss'

//eslint-disable-next-line
export default () => {

    const { mode } = useParams()

    const tickets = useSelector(state => state.ticket.tickets.filter(item =>  mode === 'active' ? item.status === 0 : mode === 'resolved' ? item.status === 1 : item))
    const allCount = useSelector(state => state.ticket.tickets.length)
    const activeCount = useSelector(state => state.ticket.tickets.filter(item => item.status === 0).length)
    const resolvedCount = useSelector(state => state.ticket.tickets.filter(item => item.status === 1).length)
    const user = useSelector(state => state.app.user)
    const dispatch = useDispatch()

    const { t } = useTranslation(['main', 'tickets'])

    useEffect(() => {
        dispatch(getTicketsHandler())
        //eslint-disable-next-line
    }, [])

    return (
        <div className="tickets">
            <div className="tickets-header">
                <Link to="/faq"><Back/></Link>
                <h2>{t('tickets:tickets')}</h2>
                {/* <ButtonYellow className={'create'} onClick={() => dispatch(showTicketCreatePopup())}>{t('tickets:createTicket')}</ButtonYellow> */}
            </div>
            {allCount > 0 ? <ul className="tickets-body">
                <div className="tickets-body-list">
                    {tickets.map(item => <li key={item.id}><Link className={'tickets-body-list-item'} to={"/ticket/" + item.id}>
                        <span className="id">#{item.id}</span>
                        <span className="name">{item.reason}</span>
                        {item.status === 0 ? <span className="date">{item.moment}</span> : ''}
                        <span className={"status " + (item.status === 0 ? 'active' : 'resolved')}>
                            {item.status === 0 ? <Arrow/> : 'Solved'}
                        </span>
                    </Link></li> )}
                </div>
                { user ? <div className="tickets-body-nav">
                    <Link to="/tickets/all"><Ticket/>{t('tickets:yourTickets')}<Arrow/></Link>
                    <ul className="tickets-body-nav-list">
                        <li className="tickets-body-nav-list-item">
                            <Link to="/tickets/active">
                                <span>{t('tickets:activeTickets')}</span>
                                <span className="count count-active">{activeCount}</span>
                            </Link>
                        </li>
                        <li className="tickets-body-nav-list-item">
                            <Link to="/tickets/resolved">
                                <span>{t('tickets:resolvedTickets')}</span>
                                <span className="count">{resolvedCount}</span>
                            </Link>
                        </li>
                    </ul>
                    <ButtonYellow className={'create-ticket'} onClick={() => dispatch(showTicketCreatePopup())}>{t('tickets:createTicket')}</ButtonYellow>
                </div> : '' }
            </ul> : ''}
            {allCount === 0 ? <div className="tickets-body-empty">
                <span>{t('tickets:empty')}</span>
                <ButtonYellow className={'create'} onClick={() => dispatch(showTicketCreatePopup())}>{t('tickets:createTicket')}</ButtonYellow>
            </div> : ''}
        </div>
    )
}