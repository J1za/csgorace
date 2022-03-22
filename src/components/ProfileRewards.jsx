import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getProfileRewardsHandler, reverseReward, claimRewardHandler } from '../redux/actions'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Info } from '../assets/info-reward.svg'
import { ReactComponent as Close } from '../assets/close.svg'
import { ReactComponent as Lock } from '../assets/lock.svg'
import { ReactComponent as Unlock } from '../assets/unlock.svg'
import { ReactComponent as Lines } from '../assets/lines.svg'

import './ProfileRewards.scss'


import Fin from '../assets/reward/fin.png'
import Fdep from '../assets/reward/fdep.png'
import Bets from '../assets/reward/bets.png'
import X20 from '../assets/reward/x20.png'
import Tdep from '../assets/reward/tdep.png'
import Ref from '../assets/reward/ref.png'
import Top3 from '../assets/reward/top3.png'
import Chat from '../assets/reward/chat.png'


export default () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const rewards = useSelector(state => state.profile.rewards)
    const user = useSelector(state => state.app.user)
    const server = useSelector(state => state.app.server)

    useEffect(() => {
        dispatch(getProfileRewardsHandler('profile'))
    }, [])

    return (
        <div className="profile-rewards">
            {rewards.map(item => (
                <div key={item.id} className={"profile-rewards-item-content " + (item.info ? 'info ' : '')}>
                    <div className="profile-rewards-item">
                        <div className={"rewards-front " + (user.achievements[item.id] === 0 || user.achievements[item.id] === 1 ? 'block' : '')}>
                            <div className="rewards-front-header">
                                <span>{item.id === 'fdep' ? '' : '$'}{ item.id === 'fdep' ? ((server.achievementBonus - 1) * 100).toFixed(2) : item.amount / 100 }{ item.id === 'fdep' ? '%' : ''}</span>
                                <Info onClick={() => dispatch(reverseReward(item.id))}/>
                            </div>
                            <div className="rewards-front-name">{ t('profile:rewards_list.' + item.id ) }</div>
                            <img src={
                                item.id === 'fin' ? Fin : 
                                item.id === 'fdep' ? Fdep : 
                                item.id === 'bets' ? Bets : 
                                item.id === 'x20' ? X20 : 
                                item.id === 'tdep' ? Tdep : 
                                item.id === 'ref' ? Ref : 
                                item.id === 'top3' ? Top3 : 
                                item.id === 'chat' ? Chat : ''} alt="" className="rewards-front-img" />
                            {user.achievements[item.id] === 0  || user.achievements[item.id] === 1 ? <div className="rewards-front-block">
                                <div className="rewards-front-header">
                                <span>{item.id === 'fdep' ? '' : '$'}{ item.id === 'fdep' ? ((server.achievementBonus - 1) * 100).toFixed(2) : item.amount / 100 }{ item.id === 'fdep' ? '%' : ''}</span>
                                    <Info onClick={() => dispatch(reverseReward(item.id))}/>
                                </div>
                                <div className="rewards-front-name">{ t('profile:rewards_list.' + item.id ) }</div>
                                <div className="rewards-front-block-image">
                                    { user.achievements[item.id] === 0 ? <Lock/> : user.achievements[item.id] === 1 ? <Unlock/> : ''}
                                </div>
                                {user.achievements[item.id] === 0 ? <div className="rewards-front-block-progress">
                                    0/1
                                </div> : user.achievements[item.id] === 1 ? <button className='rewards-front-block-pickup' onClick={() => dispatch(claimRewardHandler(item.id))}>{ t('profile:pickUp') } ${ item.amount / 100 }</button> : '' }
                                <Lines className="rewards-front-block-background"/>
                            </div> : '' }
                        </div>
                        <div className="rewards-back">
                            <div className="rewards-back-header">
                            <span>{item.id === 'fdep' ? '' : '$'}{ item.id === 'fdep' ? ((server.achievementBonus - 1) * 100).toFixed(2) : item.amount / 100 }{ item.id === 'fdep' ? '%' : ''}</span>
                                <div className="close"  onClick={() => dispatch(reverseReward(item.id))}><Close/></div>
                            </div>
                            <div className="rewards-back-name">{ t('profile:rewards_list.' + item.id ) }</div>
                            <div className="rewards-back-text">{ t('profile:rewards_list_text.' + item.id ) }</div>
                            <div className="rewards-back-ps">{ t('profile:rewards_list_ps.' + item.id ) }</div>
                            <div className="rewards-back-progress"> 0/1 </div>
                            <Lines className="rewards-front-block-background"/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}