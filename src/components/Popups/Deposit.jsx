import React, { useEffect, useRef, useState } from 'react'

import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

import { useLocation, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { changeDepositAmount, changeDepositMethod, depositPay, getDeposit, hideDeposit, referralCodeHandler, showError } from '../../redux/actions'
import { useTranslation } from 'react-i18next'

import Popup from './Popup'
import ButtonYellow from '../ButtonYellow'


import { ReactComponent as Info } from '../../assets/info-deposit.svg'
// import { ReactComponent as Btc } from '../../assets/btc.svg'
// import { ReactComponent as Ak } from '../../assets/ak.svg'

import { ReactComponent as Fuel } from '../../assets/fuel.svg'
import { ReactComponent as Check } from '../../assets/check.svg'

import { ReactComponent as Qiwi } from '../../assets/pay/qiwi.svg'
import { ReactComponent as Mc } from '../../assets/pay/mc.svg'
import { ReactComponent as U } from '../../assets/pay/u.svg'
import { ReactComponent as Visa } from '../../assets/pay/visa.svg'


import { ReactComponent as Shadow } from '../../assets/shadow.svg'

import Crypto from '../../assets/crypto-coins.png'
import Awp from '../../assets/awp.png'

import './Deposit.scss'
 
export default function Deposit() {

    const depositPopup = useSelector(state => state.popup.deposit)
    const depositMethod = useSelector(state => state.deposit.method)
    const depositMinSumm = useSelector(state => state.deposit.minSumm)
    const depositAmount = useSelector(state => state.deposit.amount)
    const coinbaseId = useSelector(state => state.deposit.coinbaseId)
    const server = useSelector(state => state.app.server)
    const user = useSelector(state => state.app.user)
    const bonus = useSelector(state => state.app.bonus)
    const coinbaseBtn = useRef()
    const [ promocode, setPromocode ] = useState('')

    const history = useHistory()

    const dispatch = useDispatch()
    const location = useLocation()

    const { t } = useTranslation(['deposit'])

    useEffect(() => {
        if(depositPopup){
            window.history.pushState('', '', '/deposit')
        } else {
            if(location.pathname.includes('deposit')){
                history.push('/streetrace')
            } else {
                window.history.pushState('', '', location.pathname)
            }
        }
        //eslint-disable-next-line
    }, [depositPopup])

    return (
        <Popup popup={depositPopup} handler={hideDeposit} className={'deposit'}>
            <div className="deposit-body">
                <div className="deposit-header">{t('deposit:select')}</div>
                <div className="deposit-title">
                    <Info/>
                    <span>{t('deposit:disclaimer')}</span>
                </div>
                <div className="deposit-subtitle">{t('deposit:alternative')}</div>
                {/* <div className="deposit-alternate">
                    <CoinbaseCommerceButton ref={coinbaseBtn} className={'deposit-alternate-coinbase'} checkoutId={'1470f703-6836-49ac-a141-27fb9a3a3089'} customMetadata={coinbaseId + ':' + user?.steamId}>
                        <div className="coinbase-plug" onClick={event => {
                            event.stopPropagation()
                            event.preventDefault()
                            dispatch(getDeposit()).then(() => coinbaseBtn.current.handleButtonClick())
                        }}>

                        </div>
                        <Btc/>
                        <span>{t('deposit:crypto')}</span>
                    </CoinbaseCommerceButton>
                    <button className={'deposit-alternate-skins'} onClick={() => dispatch(depositPay(null, 'skins'))}>
                        <Ak/>
                        <span>{t('deposit:skins')}</span>
                    </button>
                </div> */}
            </div>
            <div className="deposit-methods">
                {/* <CoinbaseCommerceButton ref={coinbaseBtn} onClick={event => {
                            event.stopPropagation()
                            event.preventDefault()
                            dispatch(getDeposit()).then(() => coinbaseBtn.current.handleButtonClick())
                        }} className="deposit-methods-item link-item" checkoutId={'1470f703-6836-49ac-a141-27fb9a3a3089'} customMetadata={coinbaseId + ':' + user?.steamId}>
                    <img src={Crypto} alt="" />
                    <span>{t('deposit:crypto')}</span>
                </CoinbaseCommerceButton>
                <div className="deposit-methods-item link-item" onClick={() => dispatch(depositPay(null, 'skins'))}>
                    <img src={Awp} alt="" />
                    <span>{t('deposit:skinsback')}</span>
                    <div className="skins-text">{t('deposit:skins')}</div>
                </div> */}
                <div onClick={() => dispatch(changeDepositMethod(4, 1))} className={"deposit-methods-item link-item " + (depositMethod === 4 ? 'active' : '')}>
                    <img src={Crypto} alt="" />
                    <Shadow/>
                    <span>{t('deposit:crypto')}</span>
                </div>
                <div className={"deposit-methods-item link-item " + (depositMethod === 5 ? 'active' : '')} onClick={() => dispatch(changeDepositMethod(5, 1))}>
                    <img src={Awp} alt="" />
                    <Shadow/>
                    <span>{t('deposit:skinsback')}</span>
                    <div className="skins-text">{t('deposit:skins')}</div>
                </div>
                <div className={"deposit-methods-item " + (depositMethod === 0 ? 'active' : '')} onClick={() => dispatch(changeDepositMethod(0, 1))}>
                    <Qiwi/>
                    <span>{t('deposit:minSum')} 1$</span>
                </div>
                <div  className={"deposit-methods-item " + (depositMethod === 1 ? 'active' : '')} onClick={() => dispatch(changeDepositMethod(1, 1))}>
                    <U/>
                    <span>{t('deposit:minSum')} 1$</span>
                </div>
                <div className={"deposit-methods-item " + (depositMethod === 2 ? 'active' : '')} onClick={() => dispatch(changeDepositMethod(2, 1))}>
                    <Mc/>
                    <span>{t('deposit:minSum')} 1$</span>
                </div>
                <div className={"deposit-methods-item " + (depositMethod === 3 ? 'active' : '')} onClick={() => dispatch(changeDepositMethod(3, 1))}>
                    <Visa/>
                    <span>{t('deposit:minSum')} 1$</span>
                </div>
            </div>
            <div className="deposit-amount">
                <div className="deposit-amount-form">
                    <div className="input-wrapper-form">
                        <span>{t('deposit:enterSumm')} 
                        <div className="deposit-amount-bonus-mobile">
                                <Fuel/>
                                <div className="fuel">
                                    <span>1</span>
                                </div>
                                =
                                <div className="dollar">
                                    <span>{bonus ? (1 / (server?.dropsRate || 1)  / bonus).toFixed(2) : (1 / (server?.dropsRate || 1) / (server?.depositBonus || 1)).toFixed(2)}$</span>
                                </div>
                                {server?.depositBonus > 1 ? <div className="bonus">({(((server?.depositBonus - 1) * 100) * -1).toFixed(2)}%)</div> : ''}
                            </div>
                        </span>
                        <div className={"input-wrapper pay " + (depositMethod === null || depositMethod === 4 || depositMethod === 5 ? 'disabled' : '')}>
                            <Fuel/>
                            <input disabled={depositMethod === null || depositMethod === 4 || depositMethod === 5} type="text" value={depositAmount} onChange={event => dispatch(changeDepositAmount(event.target.value))} step="0.01" min="0.01" />
                        </div>
                    </div>
                    <div className="input-wrapper-form">
                        <span>{t('deposit:promo')}</span>
                        <div className={"input-wrapper "}>
                            <input type="text" value={promocode}  onChange={event => setPromocode(event.target.value)} step="0.01" min="0.01" />
                            <Check className="check-icon" onClick={() => {
                                if(!promocode.length){
                                    dispatch(showError({text: 'Enter code', translate: false}))
                                } else {
                                    dispatch(referralCodeHandler(promocode))
                                    .then(() => setPromocode(''))
                                    .catch(() => setPromocode(''))
                                }
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="deposit-amount-bonus">
                    <Fuel/>
                    <div className="fuel">
                        <span>1</span>
                    </div>
                    =
                    <div className="dollar">
                         <span>{bonus ? (1 / (server?.dropsRate || 1)  / bonus).toFixed(2) : (1 / (server?.dropsRate || 1) / (server?.depositBonus || 1)).toFixed(2)}$</span>
                    </div>
                    {server?.depositBonus > 1 ? <div className="bonus">({(((server?.depositBonus - 1) * 100) * -1).toFixed(2)}%)</div> : ''}
                </div>
                {depositMethod === 4 ? <CoinbaseCommerceButton ref={coinbaseBtn} onClick={event => {
                            event.stopPropagation()
                            event.preventDefault()
                            dispatch(getDeposit()).then(() => coinbaseBtn.current.handleButtonClick())
                        }} className="yellow-button deposit-amount-form-submit" checkoutId={'1470f703-6836-49ac-a141-27fb9a3a3089'} customMetadata={coinbaseId + ':' + user?.steamId}>
                    {t('deposit:pay')}
                </CoinbaseCommerceButton> : <ButtonYellow className={'deposit-amount-form-submit'} disabled={depositMethod === null || ((depositMethod !== 4 && depositMethod !== 5) && depositAmount < depositMinSumm)} 
                    onClick={() => depositMethod !== 5 ? dispatch(depositPay(bonus ? depositAmount / bonus : depositAmount, 'freekassa')) : dispatch(depositPay(null, 'skins'))}
                > {depositMethod !== 5 ? (depositMethod === null || depositAmount < depositMinSumm ? '0$' : t('deposit:pay') + ' ' + (bonus ? (depositAmount / (server?.dropsRate || 1) / bonus || 0).toFixed(2) : (depositAmount / (server?.dropsRate || 1) / (server?.depositBonus / 1) || 0).toFixed(2)) + ' $') : t('deposit:pay')} </ButtonYellow> }
            </div>
        </Popup>
    )
}