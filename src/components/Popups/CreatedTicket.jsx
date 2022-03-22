import React from 'react'

import { useSelector } from 'react-redux' 

import { useTranslation } from 'react-i18next'

import Popup from './Popup'

import success from '../../assets/success.png'

import './CreatedTicket.scss'
//eslint-disable-next-line
export default () => {

    const { t } = useTranslation(['tickets'])
    

    const ticketCreatedPopup = useSelector(state => state.popup.ticketCreated)

    return (
        <Popup popup={ticketCreatedPopup.show} className={'ticket-created'}>
            <img src={success} alt="" />
            <div className="ticket-created-header">{t('tickets:ticket')} #{ticketCreatedPopup.id} {t('tickets:created')}</div>
            <div className="ticket-created-title">{t('tickets:checkEmail')}</div>
        </Popup>
    )
}