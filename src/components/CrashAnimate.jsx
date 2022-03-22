import React, { useEffect, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
// import { Stage, Layer, Line } from 'react-konva'

import { crashWorkerInstanse } from '../workers/workers'

// import { ReactComponent as Car } from '../assets/car-fire.svg'

import Background from '../assets/crash/background.png'

import { ReactComponent as Mountain1 } from '../assets/crash/mountain1.svg'
import { ReactComponent as Mountain2 } from '../assets/crash/mountain2.svg'

import './CrashAnimate.scss'

export default function CrashChart () {


    const streamer = useSelector(state => state.app.streamer)
    const user = useSelector(state => state.app.user)
    const title = useSelector(state => state.crash.title)
    const stage = useSelector(state => state.crash.stage)
    const x = useSelector(state => state.crash.x)

    const cashouts = useSelector(state => state.crash.cashouts)
    const [cashoutsData, setCashoutsData] = useState([])
    
    const chart = useRef()
    const anchor = useRef()
    const [ lineParams, setLineParams ] = useState({ width: 0, angle: 0 })

    const [transform, setTransform] = useState(0)
    const [gradient, setGradient] = useState(0)

    const dispatch = useDispatch()

    const resizeHandler = () => {
        const widthLine = Math.sqrt(Math.pow(chart.current.getBoundingClientRect().width, 2) + Math.pow(chart.current.getBoundingClientRect().height - 10, 2))
        const sin = chart.current.getBoundingClientRect().width / widthLine
        const angle = 180 - 90 - Math.asin(sin) * 180 / Math.PI
        setLineParams({ width: widthLine, angle: angle })
    }


    useEffect(() => {

        const xCalc = x - 1
        if(xCalc * 90 < 97){
            const percent = xCalc * 90

            setTransform(percent / 100)
        } else {
            setTransform(97 / 100)
        }
        if(x < 2) {
            setGradient(0)
        } else if (x < 3) {
            setGradient(1)
        } else if (x < 9) {
            setGradient(2)
        } else {
            setGradient(3)
        }
        //eslint-disable-next-line
    }, [x])

    useEffect(() => {
        if(stage === 2){
            // line.current.show()
        } else {
            crashWorkerInstanse.postMessage({ type: 'clear' })
            setTransform(0)
        }
        //eslint-disable-next-line
    }, [stage])

    useEffect(() => {
        // setCashoutsData(prev => cashouts[cashouts.length - 1] ?  prev.concat({...cashouts[cashouts.length - 1], top: anchor.current.offsetTop, left: anchor.current.offsetLeft + 10}) : [])
        //eslint-disable-next-line
    }, [cashouts])

    useEffect(() => {
        crashWorkerInstanse.postMessage({ type: 'clear' })
        crashWorkerInstanse.onmessage = data => {
            dispatch({ type: data.data.type, payload: data.data.payload })
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () =>  {
            crashWorkerInstanse.postMessage({ type: 'clear' })
            window.removeEventListener('resize', resizeHandler)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div className="crash-chart" ref={chart}>
            <div className="crash-chart-background">
                <img src={Background} alt="" />
                <Mountain1/>
                <Mountain2/>
            </div>
            <div className={"crash-chart-title " +  (x < 2 ? 'grey ' : x < 3 ? 'lime ' : x < 9 ? 'blue ' : x < 20 ? 'violet ' : 'gold ') + (stage === 0 ? 'red' : '')}> <span>x</span> <span className="value">{stage === 2 || stage === 0 ? (x ? (x >= 1 ? +x.toString() : +(1).toString()).toFixed(2) : '') : ''}</span> </div>
            <div className="crash-chart-bets">
                {cashoutsData.map((item, i) => <span key={i} style={{left: item.left,  top: item.top}}>{streamer && user?.steamId !== item.s_i  ? '*'.repeat(item.u.length) : item.u} @{item.c.toString()}</span> )}
            </div>
            {/* <div className="crash-chart-line" style={{ transform: `rotate(-${lineParams.angle}deg)`, width: `${lineParams.width}px` }}> 
                {stage === 2 ? <> <span style={{width: `${transform}%`}} className={(x < 2 ? 'grey ' : x < 3 ? 'green' : x < 9 ? 'blue ' : 'gold ')}>  </span> <span className='anchor' ref={anchor}></span> </> : '' }
            </div> */}
            <svg className="crash-chart-svg">
                <path d={  `M0 ${chart.current?.getBoundingClientRect().height} 
                            C  ${chart.current?.getBoundingClientRect().width / 3 * transform + (x > 1.5 ? x * 40 : 0) > chart.current?.getBoundingClientRect().width - 100 ? chart.current?.getBoundingClientRect().width - 100 : chart.current?.getBoundingClientRect().width / 3 * transform + (x > 1.5 ? x * 40 : 0)} ${chart.current?.getBoundingClientRect().height - chart.current?.getBoundingClientRect().height / 3 * transform + x > chart.current?.getBoundingClientRect().height - 20 ? chart.current?.getBoundingClientRect().height - 20 : chart.current?.getBoundingClientRect().height - chart.current?.getBoundingClientRect().height / 3 * transform + x }, 
                               ${chart.current?.getBoundingClientRect().width / 3 * 2 * transform + (x > 1.5 ? x * 20 : 0) > chart.current?.getBoundingClientRect().width - 100 ? chart.current?.getBoundingClientRect().width - 100 : chart.current?.getBoundingClientRect().width / 3 * 2 * transform + (x > 1.5 ? x * 20 : 0)} ${chart.current?.getBoundingClientRect().height - chart.current?.getBoundingClientRect().height / 3 * 2 * transform}, 
                               ${chart.current?.getBoundingClientRect().width * transform} ${chart.current?.getBoundingClientRect().height * (1 - transform)},`}

                    stroke="url(#gradient)" stroke-linecap="round" strokeWidth={'14'} fill="transparent"/>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        {gradient === 0 ? (
                            <>
                                <stop offset="21%" stop-color="#4E5161" />
                                <stop offset="94%" stop-color="#1F2431" />
                            </>
                        ) : gradient === 1 ? (
                            <>
                                <stop offset="21%" stop-color="#46BE60" />
                                <stop offset="67%" stop-color="#68FF80" />
                                <stop offset="94%" stop-color="#1F2431" />
                            </>
                        ) : gradient === 2 ? (
                            <>
                                <stop offset="21%" stop-color="#4B68FF" />
                                <stop offset="67%" stop-color="#3EAEFF" />
                                <stop offset="94%" stop-color="#1F2431" />
                            </>
                        ) : (
                            <>
                                <stop offset="21%" stop-color="#E8E13F" />
                                <stop offset="37%" stop-color="#E8E13F" />
                                <stop offset="61%" stop-color="#FFAD32" />
                                <stop offset="93%" stop-color="#1F2431" />
                            </>
                        )}
                    </linearGradient>
            </svg>
        </div>
    )
}

