import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// import BackBtn from '../components/BackBtn'

import { useTranslation } from 'react-i18next'
import { changeLoader, clearHangar, getHangarsHandler, openHangarsHandler, 
    // showFreeInfo 
} from '../redux/actions'
import { UPDATE_BALANCE } from '../redux/types'

import Car1 from '../assets/free/1.png'
import Car2 from '../assets/free/2.png'
import Car3 from '../assets/free/3.png'
import Car4 from '../assets/free/4.png'
import Car5 from '../assets/free/5.png'
import Car6 from '../assets/free/6.png'
import Car7 from '../assets/free/7.png'
import Car8 from '../assets/free/8.png'
import Car9 from '../assets/free/9.png'
import Car10 from '../assets/free/10.png'
import Car11 from '../assets/free/11.png'
import Track from '../assets/free.png'

import { ReactComponent as Fuel } from '../assets/fuel.svg'
import { ReactComponent as Info } from '../assets/info.svg'

import './Free.scss'

export default function Free () {

    const { t } = useTranslation(['free'])

    const dispatch = useDispatch()

    const [ animate, setAnimate ] = useState(null)
    const [ result, setResult ] = useState(0)
    //eslint-disable-next-line
    const [ time, setTime ] = useState(0)
    //eslint-disable-next-line
    const [ lastTimeOut, setLastTimeOut ] = useState(null)
    const [ lastInterval, setLastInterval ] = useState(null)
    const hangars = useSelector(state => state.hangars.hangars)
    const openResult = useSelector(state => state.hangars.openResult)
    const level = useSelector(state => state.app.user.level)
    const chat = useSelector(state => state.chat.chat)


    const animationScreen = (step, animate) => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                if(prevTime + 100 <= (animate <= 3 ? 14000 : animate > 3 && animate <= 7 ? 12000 : 10000)){
                    setResult(prev => prev - step)
                    return prevTime + 100
                }
            })
        }, 100)
        setLastInterval(interval)
        setLastTimeOut(setTimeout(() => {
            clearInterval(interval)
            setAnimate(null)
            setTime(0)
            setResult(openResult)
            dispatch({ type: UPDATE_BALANCE, payload: openResult })
        }, (animate <= 3 ? 14000 : animate > 3 && animate <= 7 ? 12000 : 10000)))
    }

    useEffect(() => {
        dispatch(changeLoader(false))
        dispatch(getHangarsHandler())
        return () => {
            dispatch(clearHangar())
            clearInterval(lastInterval)
            setLastTimeOut(prev => {
                if(prev){
                    while (prev--) {
                        clearTimeout(prev)
                    }
                }
                return null
            })
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(openResult || openResult === 0){
            setResult( openResult === 0 ? 0.03 : openResult * 3)
            animationScreen((openResult === 0 ? 0.02 : (openResult * 2)) / (animate <= 3 ? 140 : animate > 3 && animate <= 7 ? 120 : 100), animate)
        }
        //eslint-disable-next-line
    }, [openResult])

    const [cars, setCars] = useState([false,false,false,false,false,false,false,false,false,false,false])
    const [isCarMoving, setIsCarMoving] = useState(false)

    return (
        <div className={"free-page " + (chat ? 'free-page-full' : '')}>
            <div className="free-header">
                <h1>{t('free:garage')}
                    <div className="info">
                        <Info/>
                        <div className="info-popup">
                            <div className="popup-name">{t('free:garage')}</div>
                            <div className="popup-text">{t('free:info.p1')}</div>
                        </div>
                    </div>
                </h1>
            </div>
            <div className={"free-body "}>
                <div className="free-body-track">
                    <img src={Track} onLoad={() => dispatch(changeLoader(true))} alt="" className="free-body-track-img" />
                </div>
                <div className={"free-body-cars " + (isCarMoving ? `car-run-${cars.indexOf(true) + 1}` : '')}>
                    {hangars.map((item, index) => <div className="car-item" key={index}>
                        <img className={(level >= item.level ? 'visible ' : '') + (item.opened && !cars[index] ? 'opened' : '')} 
                        src={item.level === 5 ? Car1 : item.level === 10 ? Car2 : item.level === 20 ? Car3 : item.level === 30 ? Car4 : item.level === 40 ? Car5 : item.level === 50 ? Car6 : item.level === 60 ? Car7 : item.level === 70 ? Car8 : item.level === 80 ? Car9 : item.level === 90 ? Car10 : Car11 } alt="" 
                        onClick={() => {
                            setAnimate(index)
                            if(level >= item.level && !isCarMoving){
                                dispatch(openHangarsHandler(item.level))
                                .then(res => {
                                    if(res){
                                        const temp = [...cars]
                                        temp[index] = true
                                        setCars(temp)
                                        setIsCarMoving(true)
                                        setTimeout(() => {
                                            setCars([false,false,false,false,false,false,false,false,false,false,false])
                                            setIsCarMoving(false)
                                        }, 14000)
                                    }
                                })
                            }
                        }} />
                        <div className="car-item-popup">
                            <div className="popup-name">{item.name}</div>
                            <div className="popup-title">{t('free:chances')}:</div>
                            <div className="popup-items">
                                {item.items.map((chance, idx) => (
                                    <div className="popup-items-value" key={idx}>
                                        <div className="amount">
                                            <span>+{chance.amount}</span>
                                            <Fuel/>
                                        </div>
                                        <div className="chance">
                                            {t('free:chance')}: {+(chance.chance * 100).toFixed(3)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>)}
                </div>
                {openResult || result || true ? <div className="free-body-screen">
                    <span>{(result).toFixed(2)}</span>
                    <Fuel/>
                </div> : '' }
            </div>
        </div>
    )
}
