import React, { useEffect } from 'react'

import GameNav from '../components/GameNav'
import GameHeader from '../components/GameHeader'
import GameAmount from '../components/GameAmount'

import Hash from '../components/Hash'
import StreetraceBets from '../components/StreetraceBets'
import StreetraceAnimate from '../components/StreetraceAnimate'

import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'

import { getStreetraceRound } from '../utilites/api'
import { getStreetraceHandler, inputAmount, showRoundDetail, streetraceCleaner, showStreetraceInfo, changeMuteStreetrace } from '../redux/actions'

// import { ReactComponent as Fuel } from '../assets/fuel.svg'
// import { ReactComponent as StreetraceItem } from '../assets/roullete.svg'
import { ReactComponent as Flags } from '../assets/flags.svg'
// import { ReactComponent as Mute } from '../assets/mute.svg'
// import { ReactComponent as Volume } from '../assets/volume.svg'

import './Streetrace.scss'

export default function Streetrace(){

    const { t } = useTranslation(['streetrace'])

    const dispatch = useDispatch()

    const rates = useSelector(state => state.amount.rates)
    const amount = useSelector(state => state.amount.amount)
    // const user = useSelector(state => state.app.user)


    const streetrace = useSelector(state => state.streetrace.streetrace)
    const previous = useSelector(state => state.streetrace.previous)
    const betsAll = useSelector(state => state.streetrace.betsAll)
    const seconds = useSelector(state => state.streetrace.seconds)
    const mute = useSelector(state => state.streetrace.mute)
    const bankroll = useSelector(state =>  state.streetrace.betsAll.reduce((counter, value) => counter + value.b_a, 0))

    useEffect(() => {
        dispatch(getStreetraceHandler())
        return () => dispatch(streetraceCleaner())
        //eslint-disable-next-line
    }, [])

    return (
        <div className="streetrace">
            <GameNav/>
            <GameHeader mute={mute} muteHandler={() => dispatch(changeMuteStreetrace())} infoHandler={() => dispatch(showStreetraceInfo())} title={t('streetrace:streetrace')} icon={<Flags/>} timer={seconds} bankroll={bankroll} popupText={t('streetrace:info.p1')}/>
            <div className="streetrace-stat">
                <div className="streetrace-stat-history">
                    <span>{t('streetrace:recent')}</span>
                    <ul className="history">
                        {previous.slice(0, 10).map(round => <li key={round.roundId} className={(round.car === 0 ? 'red' : round.car === 1 ? 'yellow' : round.car === 2 ? 'blue' : 'green')} onClick={() => dispatch(showRoundDetail(round.roundId, id => getStreetraceRound(id) ))}></li> )}
                    </ul>
                </div>
                <div className="streetrace-stat-last">
                    <span>{t('streetrace:last')} 100</span>
                    <div className="values">
                        <div className="values-item"><span className={'color red'}></span> <span>{previous.slice(0, 100).filter(item => item.car === 0).length}</span> </div>
                        <div className="values-item"><span className={'color yellow'}></span> <span>{previous.slice(0, 100).filter(item => item.car === 1).length}</span> </div>
                        <div className="values-item"><span className={'color blue'}></span> <span>{previous.slice(0, 100).filter(item => item.car === 2).length}</span> </div>
                        <div className="values-item"><span className={'color green'}></span> <span>{previous.slice(0, 100).filter(item => item.car === 3).length}</span> </div>
                    </div>
                </div>
            </div>
            <StreetraceAnimate/>
            <GameAmount rates={rates} changeAmount={inputAmount} amount={amount} game={streetrace}/>
            <div className="streetrace-bets">
                <StreetraceBets bets={betsAll.filter(item => item.c === 0)} className={'red'} type={0}/>
                <StreetraceBets bets={betsAll.filter(item => item.c === 1)} className={'yellow'} type={1}/>
                <StreetraceBets bets={betsAll.filter(item => item.c === 3)} className={'green'} type={3}/>
                <StreetraceBets bets={betsAll.filter(item => item.c === 2)} className={'blue'} type={2}/>
            </div>
            <Hash hash={streetrace?.previousHash} />
        </div>
    )
}