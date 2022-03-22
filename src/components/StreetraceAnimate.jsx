import React, { useEffect, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { changeLoader } from '../redux/actions'


import Track from '../assets/track.svg'
import TrackNight from '../assets/track-night.svg'
import { ReactComponent as Racer1 } from '../assets/cars/racer1.svg'
import { ReactComponent as Racer2 } from '../assets/cars/racer2.svg'
import { ReactComponent as Racer3 } from '../assets/cars/racer3.svg'
import { ReactComponent as Racer4 } from '../assets/cars/racer4.svg'

import './StreetraceAnimate.scss'

export default function StreetraceAnimated(){

    const [audioStart] = useState(new Audio('./audio/sstart.mp3'));
    const [audioEnd] = useState(new Audio('./audio/ss.mp3'));
    const track = useRef()
    const [ caseCars, setCaseCars ] = useState(0) 
    const [ caseRace, setCaseRace ] = useState(0) 
    const [ isNight, setIsNight ] = useState(false)
    //eslint-disable-next-line
    const [ lastTimeOut, setLastTimeOut ] = useState(null)

    const stage = useSelector(state => state.streetrace.stage)
    const streetrace = useSelector(state => state.streetrace.streetrace)
    const winner = useSelector(state => state.streetrace.winner)
    const mute = useSelector(state => state.streetrace.mute)
    const loader = useSelector(state => state.app.loader)
    const seconds = useSelector(state => state.streetrace.seconds)

    const dispatch = useDispatch()

    const resizeHandler = () => {
        let percentOffset = (window.innerWidth > 3000 ? 25 : window.innerWidth > 2700 ? 28 : window.innerWidth > 2300 ? 31 :  window.innerWidth > 2048 ? 33  : window.innerWidth > 1800 ? 33 : window.innerWidth > 1600 ? 36 :  window.innerWidth > 1300 ? 39 : window.innerWidth > 300 ? 80 : 42)
        document.documentElement.style.setProperty('--th', `${track.current.clientHeight - ((window.innerWidth / 100 * percentOffset) - 100)}px`);
    }

    useEffect(() => {
        audioStart.pause()
        audioEnd.pause()
        audioStart.currentTime = 0.0;
        audioEnd.currentTime = 0.0;
        window.addEventListener('resize', resizeHandler)
        setIsNight(new Date().getHours() >= 18 || new Date().getHours() < 9)
        return () => {
            setLastTimeOut(prev => {
                if(prev){
                    while (prev--) {
                        clearTimeout(prev)
                    }
                }
                clearInterval(prev)
                return null
            })
            window.removeEventListener('resize', resizeHandler)
            audioStart.pause()
            audioEnd.pause()
            audioStart.remove()
            audioEnd.remove()
        }
        //eslint-disable-next-line
    }, [])


    useEffect(() => {
        audioStart.muted = mute
        audioEnd.muted = mute
        //eslint-disable-next-line
    }, [mute])

    useEffect(() => {
        if(seconds === 'Preparation' || loader === false || track.current.clientHeight < 100){
            return
        }
        audioStart.volume = 0.25
        audioEnd.volume = 0.25
        let time = 0
        let percentOffset = (window.innerWidth > 3000 ? 25 : window.innerWidth > 2700 ? 28 : window.innerWidth > 2300 ? 31 :  window.innerWidth > 2048 ? 33 : window.innerWidth > 1800 ? 33 : window.innerWidth > 1600 ? 36 :  window.innerWidth > 1300 ? 39 : window.innerWidth > 300 ? 80 : 42)
        document.documentElement.style.setProperty('--th', `${track.current.clientHeight - ((window.innerWidth / 100 * percentOffset) - 100)}px`);
        if(stage === 2){
            setCaseCars('')
            audioStart.pause();
            audioStart.currentTime = 0.0;
            audioEnd.play().catch(() => false)
            setCaseRace(Math.floor(Math.random() * (3 - 1 + 1)) + 1)
            if(streetrace && streetrace.stage === 2){
                time = new Date() - new Date(streetrace.start)
                time = streetrace.spinningStage - (time - streetrace.preparingStage - (streetrace.bettingStage + 2200))
                if(time > 8000 || time < 0) {
                    time = 8000
                }
            } else {
                time = 8000
            }
        } else if (stage === 1) {
            setCaseCars(1)
            if(streetrace){
                time = new Date() - new Date(streetrace.start) 
                time -= streetrace.preparingStage
                time = streetrace.bettingStage - (time + 1000)
                if(time > 15000 || time < 0) {
                    time = 15000
                }
            } else {
                time = 15000
            }
            setLastTimeOut(setTimeout(() => {
                // setYellow(true)
                audioEnd.pause();
                audioEnd.currentTime = 0.0;
                audioStart.play().catch(() => false)
            }, time - 3000))
        } else if (stage === 0) {
            setCaseCars(0)
        }
        //eslint-disable-next-line
    }, [stage])

    return (
        <div className="streetrace-track">
            <div className="track-wrapper">
                <img src={isNight ? TrackNight : Track} onLoad={() => dispatch(changeLoader(true))} alt="track" ref={track} className={"track " + (stage === 2 && seconds !== 'Preparation' ? 'animate ' : '') + (caseCars === 0 ? 'track-reset' : '')} />
                <div className="cars">
                    <Racer1 className={'car1 ' + (stage === 2 && seconds !== 'Preparation' ? '' + ' race' + winner + '0' + caseRace + (window.innerWidth < 1024 ? 'm' : '') : '') + (' case' + caseCars)}/>
                    <Racer2 className={'car2 ' + (stage === 2 && seconds !== 'Preparation' ? '' + ' race' + winner + '1' + caseRace + (window.innerWidth < 1024 ? 'm' : '') : '') + (' case' + caseCars)}/>
                    <Racer3 className={'car3 ' + (stage === 2 && seconds !== 'Preparation' ? '' + ' race' + winner + '3' + caseRace + (window.innerWidth < 1024 ? 'm' : '') : '') + (' case' + caseCars)}/>
                    <Racer4 className={'car4 ' + (stage === 2 && seconds !== 'Preparation' ? '' + ' race' + winner + '2' + caseRace + (window.innerWidth < 1024 ? 'm' : '') : '') + (' case' + caseCars)}/>
                </div>
            </div>
        </div>
    )
}