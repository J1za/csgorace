import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTicketCreateLang, hideTicketCreatePopup, changeTicketCreateReason, changeTicketCreateMessage, createTicketHandler } from '../../redux/actions'
import { questionSelect, langSelect } from '../../utilites/selects'
import { useTranslation } from 'react-i18next'
import Popup from './Popup'

import Select from '../Select'
import ButtonYellow from '../ButtonYellow'

import './CreateTicket.scss'
 //eslint-disable-next-line
export default () => {

    const ticketCreatePopup = useSelector(state => state.popup.ticketCreate)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation(['tickets'])

    const reason = useSelector(state => state.ticket.create.reason)
    const lang = useSelector(state => state.ticket.create.lang)
    const message = useSelector(state => state.ticket.create.message)
    const user = useSelector(state => state.app.user)

    const submit = event => {
        event.preventDefault()
        dispatch(createTicketHandler({
            language : langSelect.find(item => item.id === lang)?.data || user?.language || i18n.language,
            reason : questionSelect.find(item => item.id === reason)?.name || null,
            msg: message
        }))
    }

    return (
        <Popup popup={ticketCreatePopup} handler={hideTicketCreatePopup} className={'ticket-create'}>
            <form className="ticket-create-form" onSubmit={submit}>
                <div className="ticket-create-header">{t('tickets:yourTicket')}</div>
                <div className="ticket-create-title">{t('tickets:yourTicketDesc')}</div>
                <Select title={t('tickets:themeTitle')} defaultText={t('tickets:selectQuestion')} list={questionSelect.map(item => ({...item, name : t('tickets:quetionsThemes.' + item.translate)}))} active={reason} handler={ id => dispatch(changeTicketCreateReason(id)) }/>
                <Select title={t('tickets:langTitle')} defaultText={t('tickets:selectLang')} list={langSelect} active={lang} handler={ id => dispatch(changeTicketCreateLang(id)) }/>
                <textarea placeholder={t('tickets:describeIssue')} value={message} onChange={event => dispatch(changeTicketCreateMessage(event.target.value))} cols="30" rows="10"></textarea>
                <ButtonYellow className={"ticket-create-submit "} type="submit" >{t('tickets:send')}</ButtonYellow>
            </form>
        </Popup>
    )
}