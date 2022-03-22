import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// import {ReactComponent as Car } from '../assets/roulette/car.svg'
// import {ReactComponent as Water } from '../assets/roulette/water.svg'

import {ReactComponent as Red } from '../assets/roulette/red.svg'
import {ReactComponent as Red2 } from '../assets/roulette/red2.svg'
import {ReactComponent as Black } from '../assets/roulette/black.svg'
import {ReactComponent as Green } from '../assets/roulette/green.svg'


import './RouletteAnimate.scss'

export default function RoulleteAnimated(){



    const [items, setItems] = useState(200)
    const [itemsDelete, setItemsDelete] = useState(0)
    const [itemsArray, setItemsArray] = useState([])
    const [audioStart] = useState(new Audio('./audio/rstart.mp3'));
    const [audioEnd] = useState(new Audio('./audio/rend.mp3'));
    //eslint-disable-next-line
    const [time, setTime] = useState(0)
    const [translate, setTranslate] = useState(0)
    const [load, setLoad] = useState(false)

    const line = useRef()
    const last = useRef()
    const endAnchor = useRef()
    const startAnchor = useRef()

    const stage = useSelector(state => state.roullete.stage)
    const winner = useSelector(state => state.roullete.winner)
    const roullete = useSelector(state => state.roullete.roullete)
    const mute = useSelector(state => state.roullete.mute)


    useEffect(() => {
        audioStart.pause()
        audioEnd.pause()
        audioStart.currentTime = 0.0;
        audioEnd.currentTime = 0.0;
        return () => {
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
        if(winner && stage !== 2 && !load){
            setLoad(true)
        }
        //eslint-disable-next-line
    }, [winner])


    useEffect(() => {
        audioStart.volume = 0.35
        audioEnd.volume = 0.35
        if(stage === 2){
            setLoad(true)
            let timeDiff
            if(roullete && roullete.stage === 2){
                let time = new Date() - new Date(roullete.start)
                timeDiff = roullete.spinningStage - (time - roullete.preparingStage - roullete.bettingStage + 2200) // 3200
                if(timeDiff > 8000 || timeDiff < 0) {
                    timeDiff = 8000
                }
            } else {
                timeDiff = 8000
            }
            setTime(timeDiff)
            
            // spining
            audioEnd.pause();
            audioEnd.currentTime = 0.0;
            let toWinner
            toWinner = Array.from(document.querySelectorAll('.spining-item')).filter((item, index) => index > 60 && item.getBoundingClientRect().left > line.current?.getBoundingClientRect().left).slice(60).find(item => item.getAttribute('data-color').toLowerCase() === winner.toLowerCase()).getBoundingClientRect().left - line.current?.getBoundingClientRect().left + (window.innerWidth < 1024 ? 19 : window.innerWidth > 2000 ? 31 : 24)
            let minRandomOffset = ((window.innerWidth < 1024 ? 19 : window.innerWidth > 2000 ? 31 : 24) - 5) * -1
            let maxRandomOffset = (window.innerWidth < 1024 ? 19 : window.innerWidth > 2000 ? 31 : 24) - 5
            let randomOffset = Math.floor(Math.random() * (maxRandomOffset - minRandomOffset)) + minRandomOffset
            setTranslate(prev => prev - toWinner + randomOffset)
            setItems(prev => prev < 500 ? prev + 200 : prev)
            if(!mute){
                audioStart.play().catch(() => false)
            }
        } else if (stage === 1) {
            audioEnd.muted = false
            audioStart.pause();
            audioStart.currentTime = 0.0;
            setTime(0)
            let deleteItems = Array.from(document.querySelectorAll('.spining-item')).filter((item, index) => item.getBoundingClientRect().right < startAnchor.current?.getBoundingClientRect().right).length - 15
            setItemsDelete(deleteItems)
            setItems(prev => prev - deleteItems)
        } else {
            if(load && !mute){
                audioEnd.play().catch(() => false)
            }
        }
        //eslint-disable-next-line
    }, [stage])

    useEffect(() => {
        if(items - itemsArray.length > 0){
            setItemsArray(prev => prev.concat(Array(items - itemsArray.length).fill(true).map((_, index) => index % 15 === 0 && index !== 0 ? [{type: 'green'}, { type: (index - 1) % 2 === 0 ? 'red' : 'black'}] : index % 2 === 0 ? ({ type: 'black' }) : ({ type: 'red' })).flat()))
        } else if (items - itemsArray.length < 0) {
            setItemsArray(prev => {
                let deleteArray = [...prev]
                setTranslate(translate + ((itemsDelete) * (window.innerWidth < 1024 ? 43 : window.innerWidth > 2000 ? 68 : 54)))
                deleteArray.splice(0, itemsDelete)
                return [...deleteArray]
            })
        }
        //eslint-disable-next-line
    }, [items])

    return (
        <div className="roullete-wrapper">
            <div className="spining" style={{transform: `translateX(${translate}px)`, transitionDuration: stage === 2 ? `${time}ms` : '0s'}}>
                {itemsArray.map((item, index, array) => item.type === 'green' ? <div ref={index === array.length - 1 ? last : null} key={index} data-color={'green'} className={'spining-item green'}><Green />
                </div> 
                : item.type === 'black' ? <div ref={index === array.length - 1 ? last : null} key={index} data-color={'black'} className={'spining-item black'}> <Black />
                </div> 
                : <div ref={index === array.length - 1 ? last : null} key={index} data-color={'red'} className={'spining-item red'}><Red /><Red2/></div>
                )}
            </div>
            <div className="line" ref={line}></div>
            <div className="anchor-start" ref={startAnchor}></div>
            <div className="anchor-end" ref={endAnchor}></div>
        </div>
    )
}