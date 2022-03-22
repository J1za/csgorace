import React, { useEffect, useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router';

import { useSelector, useDispatch } from 'react-redux'

import { useTranslation } from 'react-i18next'

import { getProfileHandler, getProfileReferalHandler, editCodeHandler, getRedeemHandler } from "../redux/actions";

import { ReactComponent as Fuel } from '../assets/fuel.svg'
// import { ReactComponent as Logo } from '../assets/logo-ref.svg'
import { ReactComponent as Copy } from '../assets/copy-ref.svg'
import { ReactComponent as Info } from '../assets/info.svg'

// import Box from '../assets/box.png'

import './Refferals.scss'

//eslint-disable-next-line
export default ({ streamer = false }) => {

    const { t } = useTranslation(['refferals'])

    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user)
    const [promo, setPromo] = useState('')


    const { id } = useParams()
    const referal = useSelector(state => state.profile.referal)
    // const profile = useSelector(state => state.profile.profile)

    useEffect(() => {
        if(referal){
            // setPromo((user?.permissions.status > 1 ? referal.refferals.code : referal.profit.code))
            setPromo((user.code))
        }
        //eslint-disable-next-line
    }, [referal])

    useEffect(() => {
        if(!streamer){
            dispatch(getProfileHandler(id))
        }
        dispatch(getProfileReferalHandler())
        // eslint-disable-next-line
    }, [])

    if(!referal) return false

    return (
        <div className="refferals">
            {/* <div className="refferals-header">
                <img src={Box} alt="" className="box" />
                <div className="info">
                    <Logo/>
                    <span>{t('refferals:ref')}</span>
                </div>
                {user?.permissions.status < 2 ? <div className="balance">
                    <span>{t('refferals:balance')}</span>
                    <div className="fuel"><span>{referal.profit.available}</span><Fuel/></div>
                </div> : ''}
            </div> */}
            {streamer ? <div className="refferals-level-header">{t('refferals:analytics')}</div> : ''}
            {!streamer ? <div className="refferals-level">
                {user?.permissions.status !== 1 ? <div className="refferals-level-header">{t('refferals:ref')} </div> : '' }
                <div className="refferals-level-content">
                    <div className="level-data">
                        <div className="number-wrapper">
                            <div className="number">{Array.from(referal.profit.level).findIndex(item => referal.profit.totalDeposit < item)}</div>
                        </div>
                        <div className="info">
                            <div className="info-title">{t('refferals:level')}</div>
                            <div className="info-fuel">
                                <Fuel/>
                                <span>{referal.profit.totalDeposit}/{Array.from(referal.profit.level).find(item => referal.profit.totalDeposit < item)}</span>
                            </div>
                            <div className="info-line"><span style={{width: (referal.profit.totalDeposit / (Array.from(referal.profit.level).find(item => referal.profit.totalDeposit < item) / 100)) + '%'}}></span></div>
                            { Array.from(referal.profit.level).findIndex(item => referal.profit.totalDeposit < item) < 4 ? <div className="info-count">
                                {Array.from(referal.profit.level).find(item => referal.profit.totalDeposit < item) - referal.profit.totalDeposit}<span>{t('refferals:forLevel')} {Array.from(referal.profit.level).findIndex(item => referal.profit.totalDeposit < item) + 1}</span>
                            </div> : ''}
                        </div>
                    </div>
                    <div className="balance">
                        <div className="balance-data">
                            <span>{t('refferals:balance')}</span>
                            <div className="fuel">
                                <span>{referal.profit.available}</span>
                                <Fuel/>
                            </div>
                        </div>
                        <button className="balance-with" onClick={() => dispatch(getRedeemHandler())}>{t('refferals:me')}</button>
                    </div>
                </div>
            </div> : '' }
            <div className="refferals-links">
                <div className="input-wrapper">
                    <span>{t('refferals:refLink')}</span>
                    <div className="input-content">
                        {/* <input type="text" disabled value={'https://csgorace.com/referrals/' + (user?.permissions.status > 1 ? referal.refferals.code : promo)} /> */}
                        <input type="text" disabled value={'https://csgorace.com/referrals/' + (promo)} />
                        {/* <CopyToClipboard text={'https://csgorace.com/referrals/' + (user?.permissions.status > 1 ? referal.refferals.code : promo)}><Copy/></CopyToClipboard> */}
                        <CopyToClipboard text={'https://csgorace.com/referrals/' + (promo)}><Copy/></CopyToClipboard>
                    </div>
                </div>
                <div className="input-wrapper">
                    <span>{t('refferals:promo')}</span>
                    <div className="input-content">
                        {/* <input type="text" disabled={user?.permissions.status > 1} value={promo} onChange={event => setPromo(event.target.value)} /> */}
                        <input type="text"  value={promo} onChange={event => setPromo(event.target.value)} />
                        <CopyToClipboard text={user?.permissions.status > 1 ? referal.refferals.code : promo} ><Copy/></CopyToClipboard>
                        {/* {user?.permissions.status < 2 ? <button onClick={() => dispatch(editCodeHandler(promo))}>{t('refferals:save')}</button> : '' } */}
                        <button onClick={() => dispatch(editCodeHandler(promo))}>{t('refferals:save')}</button>
                    </div>
                </div>
            </div>
            <div className="refferals-statistic">
                <div className="title">{t('refferals:stat')}</div>
                {streamer ? <div className="statistic">
                    <div className="statistic-item">
                        <span>{t('refferals:bonus')}</span>
                        <div className="fuel">
                            <Fuel/>
                            <span>{referal.refferals.amount}</span>
                        </div>
                    </div>
                    <div className="statistic-item">
                        <span>{t('refferals:referers')}</span>
                        <div className="fuel">
                            <span>{referal.refferals.clicks}</span>
                        </div>
                    </div>
                    <div className="statistic-item">
                        <span>{t('refferals:used')}</span>
                        <div className="fuel">
                            <span>{referal.refferals.timesUsed}</span>
                        </div>
                    </div>
                    <div className="statistic-item">
                        <span>{t('refferals:all')}</span>
                        <div className="fuel">
                            <span>{referal.refferals.maxUsers}</span>
                        </div>
                    </div>
                </div> : '' }
                { !streamer ? <div className="statistic-full">
                    <div className="statistic-items">
                        <div className="statistic-item">
                            <span>{t('refferals:bonus')}</span>
                            <div className="fuel">
                                {/* <Fuel/> */}
                                <span>{Array.from(referal.profit.level).findIndex(item => referal.profit.totalDeposit < item)}%</span>
                            </div>
                        </div>
                        <div className="statistic-item">
                            <span>{t('refferals:invite')}</span>
                                <div className="fuel">
                                    <span>{referal.profit.count}</span>
                                </div>
                            </div>
                        <div className="statistic-item">
                            <span>{t('refferals:deposit')}</span>
                                <div className="fuel">
                                    <Fuel/>
                                    <span>{referal.profit.totalDeposit}</span>
                                </div>
                            </div>
                        <div className="statistic-item">
                            <span>{t('refferals:allWith')}</span>
                                <div className="fuel">
                                    <Fuel/>
                                    <span>{referal.profit.redeemedProfit}</span>
                                </div>
                        </div>
                    </div>
                    <div className="statistic-levels">
                        <div className="statistic-levels-header">
                            <span>{t('refferals:lvl')}</span><span>{t('refferals:deposits')}</span><span>{t('refferals:yourBonus')}</span><span>{t('refferals:refBonus')}</span>
                        </div>
                        <div className="statistic-levels-list">
                            { referal.profit.level ? Array.from(referal.profit.level)?.reverse().map((item, index) => {
                                return (
                                    <div className="level-item" key={index}>
                                        <div className={"level-wrapper " + (Array.from(referal.profit.level).findIndex(item => referal.profit.totalDeposit < item) === (5 - index) ? 'active' : '')}>
                                            <div className="level-number">{5 - index}</div>
                                        </div>
                                        <div className="deposit-value"><span>{item}</span><Fuel/></div>
                                        <div className="bonus-value">{5 - index}%</div>
                                        <div className="ref-bonus-value">5% {t('refferals:toDeposit')}</div>
                                    </div>
                                )
                            }) : '' }
                        </div>
                    </div>
                </div> : '' }
            </div>
        </div>
    )
}