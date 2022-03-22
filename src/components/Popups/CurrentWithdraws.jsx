import React from 'react'

import { useSelector, useDispatch } from 'react-redux' 

import { useTranslation } from 'react-i18next'

import { hideMobileWithdraws, setSelected } from '../../redux/actions'

import WithdrawItem from '../../components/WithdrawItem'
import Popup from './Popup'

import { ReactComponent as Back } from '../../assets/back-button.svg'
import { ReactComponent as Fuel } from '../../assets/fuel.svg'

import './CurrentWithdraws.scss'
//eslint-disable-next-line
export default () => {
    const withdraw = useSelector(state => state.popup.withdraw)
    const withdrawData = useSelector(state => state.withdraw.withdraw)
    const selected = useSelector(state => state.withdraw.selected)
    
    const dispatch = useDispatch()

    const { t } = useTranslation(['withdraw'])
    return (
        <Popup popup={withdraw} handler={hideMobileWithdraws} className={'current-withdraw'} mobile={true}>
            <div className="current-withdraw-header">
                {/* <div className="close-current" onClick={() => dispatch(hideMobileWithdraws())}><Arrow/></div> */}
                <Back onClick={() => dispatch(hideMobileWithdraws())}/>
                <span>{t('withdraw:current')}</span>
            </div>
            <div className="current-withdraw-list">
                {selected.map((item, index) => <li className={'withdraw-item-to'} key={index}>
                    <div className="withdraw-item-to-body">
                        <img src={item.image} alt="" />
                        <div className="info">
                            <div className="name">{item.name.split('(')[0]}</div>
                            <div className="title">{item.name.split('(')[1] ? item.name.split('(')[1].replace(')', '') : ''}</div>
                        </div>
                    </div>
                    <div className="withdraw-item-to-nav">
                        <div className="fuel">
                            <Fuel/>
                            {item.price}
                        </div>
                        <div className="remove" onClick={() => dispatch(setSelected(item))}><span></span></div>
                    </div>
                </li> )}
                {withdrawData.map(item => <WithdrawItem key={item.transaction_id} item={item}/>)}
            </div>
        </Popup>
    )
}