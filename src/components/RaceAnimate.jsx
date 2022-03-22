import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as Track } from '../assets/race-track.svg';
import { ReactComponent as Track2 } from '../assets/race-track2.svg';
import { ReactComponent as Fuel } from '../assets/fuel.svg';

import './RaceAnimate.scss'
import { hideTrackRace } from "../redux/actions";

//eslint-disable-next-line

export default function App() {
    gsap.registerPlugin(MotionPathPlugin);
    const textRef = useRef(null);
    const DeepRef = gsap.utils.selector(textRef);
    const showTrack = useSelector(state => state.race.showTrack)

    const dispatch = useDispatch()

    useEffect(() => {
        
        // setTimeout(() => {
            const blueCar = gsap.timeline({
                yoyo: true,
            });
            const greenCar = gsap.timeline({
                yoyo: true
            });
    
            function stateBlueCar(track2, duration = 8, ease = "Power2.easeOut", end = -1.44, start = -0.4) {
                switch (track2) {
                    case true:
                        blueCar.to(DeepRef("#blue-car"), {
                            duration,
                            position: 'relative',
                            immediateRender: true,
                            delay: 2,
                            motionPath: {
                                path: "#pathCars",
                                align: "#pathCars",
                                alignOrigin: [0.5, 0.5],
                                autoRotate: true,
                                start,
                                end,
                            },
                            ease
                        }, -1)
                        break;
    
                    default:
                        blueCar.to(DeepRef("#blue-car"), {
                            duration,
                            position: 'relative',
                            immediateRender: true,
                            delay: 2,
                            motionPath: {
                                path: "#pathCars",
                                align: "#pathCars",
                                alignOrigin: [.8, .8],
                                autoRotate: true,
                                start,
                                end,
                            },
                            ease
                        }, -1)
                        break;
                }
    
            }
            function stateGreenCar(track2 = false, duration = 7, ease = "Power1.inOut", end = -1.52, start = -0.4,) {
                switch (track2) {
                    case true:
                        greenCar.to(DeepRef("#green-car"), {
                            duration,
                            position: 'relative',
                            immediateRender: true,
                            delay: 2,
                            motionPath: {
                                path: "#pathCars2",
                                align: "#pathCars2",
                                alignOrigin: [0.5, 0.5],
                                autoRotate: true,
                                start,
                                end,
                            },
                            ease
                        }, -1)
                        break;
                    default:
                        greenCar.to(DeepRef("#green-car"), {
                            duration,
                            position: 'relative',
                            immediateRender: true,
                            delay: 2,
                            motionPath: {
                                path: "#pathCars",
                                align: "#pathCars",
                                alignOrigin: [1.3, 1.3],
                                autoRotate: true,
                                start,
                                end,
                            },
                            ease
                        }, -1)
                        break;
                }
            }
    
            function positionFrameBlueCar(x = 250, y = 40, rotation = 90, duration = 0, time = -1) {
                blueCar.to(DeepRef("#blue-frame"), {
                    scale: .9,
                    position: 'absolute',
                    x,
                    y,
                    rotation,
                    duration,
                    yoyo: true
                }, time)
            }
            function positionFrameGreenCar(x = 250, y = 40, rotation = 90, duration = 0, time = -1) {
                greenCar.to(DeepRef("#red-frame"), {
                    scale: .9,
                    position: 'absolute',
                    x,
                    y,
                    rotation,
                    duration
                }, time)
            }
    

            if(showTrack && showTrack.w) {
                if(showTrack.r_i % 2 === 0) {
                    if (showTrack.w === showTrack.f_p.s_i){
                        document.querySelector('#blue-frame').innerHTML = document.querySelector('#blue-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.s_p.a  + `" />`
                        document.querySelector('#red-frame').innerHTML = document.querySelector('#red-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.f_p.a + `" />`
                        //first animation
                        // winner
                        blueCar.add(stateBlueCar)
                        .add(positionFrameBlueCar)
                        // .add(positionFrameBlueCar(120, 230, 180, 0.5, 1))
                        // .add(positionFrameBlueCar(-110, 120, 280, 0.5, 1.5))
                        // .add(positionFrameBlueCar(120, 230, 180, 0.5, 2.7))
                        // .add(positionFrameBlueCar(250, 40, 90, 0.5, 4))
                        //loss
                        greenCar.add(stateGreenCar)
                        .add(positionFrameGreenCar)
                        // .add(positionFrameGreenCar(5, -75, 0, 0.5, 1))
                        // .add(positionFrameGreenCar(-140, 130, -90, 0.5, 1.7))
                        // .add(positionFrameGreenCar(30, -75, 0, 1, 2.7))
                        // .add(positionFrameGreenCar(250, 40, 90, 0.5, 4.5))
                    } else if (showTrack.w === showTrack.s_p?.s_i) {
                        document.querySelector('#blue-frame').innerHTML = document.querySelector('#blue-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.s_p.a  + `" />`
                        document.querySelector('#red-frame').innerHTML = document.querySelector('#red-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.f_p.a + `" />`
                        //twice animation
                        // loss
                        blueCar.call(stateBlueCar, [false, 7, "Power1.inOut", -1.52])
                        .add(positionFrameBlueCar)
                        // .add(positionFrameBlueCar(120, 230, 180, 0.5, 1))
                        // .add(positionFrameBlueCar(-110, 120, 280, 0.5, 1.5))
                        // .add(positionFrameBlueCar(120, 230, 180, 0.5, 3))
                        // .add(positionFrameBlueCar(250, 40, 90, 0.5, 4))
                        //winner
                        greenCar.call(stateGreenCar, [false, 12, "Power3.easeOut", -1.46])
                        .add(positionFrameGreenCar)
                        // .add(positionFrameGreenCar(5, -75, 0, 0.5, 1))
                        // .add(positionFrameGreenCar(-140, 130, -90, 0.5, 1.7))
                        // .add(positionFrameGreenCar(30, -75, 0, 1, 3))
                        // .add(positionFrameGreenCar(250, 40, 90, 0.5, 5))
                    }
                } else {
                    if (showTrack.w === showTrack.f_p.s_i){
                        document.querySelector('#blue-frame').innerHTML = document.querySelector('#blue-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.f_p.a  + `" />`
                        document.querySelector('#red-frame').innerHTML = document.querySelector('#red-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.s_p.a + `" />`
                        // winner
                        blueCar.call(stateBlueCar, [true, 7, "Power1.inOut", -1.35, -0.195])
                            .add(positionFrameBlueCar(250, 35, 90, 0.5, 0))
                            // .add(positionFrameBlueCar(120, 240, 180, 0.5, 1))
                            // .add(positionFrameBlueCar(-120, 140, 260, 0.5, 1.7))
                            // .add(positionFrameBlueCar(120, 240, 180, 0.5, 2.7))
                            // .add(positionFrameBlueCar(250, 35, 90, 0.5, 4))
                        // //loss
                        greenCar.call(stateGreenCar, [true, 10.5, "Power3.easeOut", -1.26, -0.17])
                            .add(positionFrameGreenCar(250, 35, 90, 0.5, 0))
                            // .add(positionFrameGreenCar(-0, -60, 0, 0.5, 1.2))
                            // .add(positionFrameGreenCar(-130, 130, -100, 0.5, 1.7))
                            // .add(positionFrameGreenCar(30, -75, 0, 0.5, 2.7))
                            // .add(positionFrameGreenCar(250, 35, 90, 0.5, 4.4))
                    } else if (showTrack.w === showTrack.s_p?.s_i) {
                        document.querySelector('#blue-frame').innerHTML = document.querySelector('#blue-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.f_p.a  + `" />`
                        document.querySelector('#red-frame').innerHTML = document.querySelector('#red-frame').innerHTML + `<image rx="20" ry="20" width="87" height="87" style="transform:translate(10px, 10px)" href="` + showTrack.s_p.a + `" />`
                        // loss
                        blueCar.call(stateBlueCar, [true, 7, "Power3.inOut", -1.24, -0.195])
                            .add(positionFrameBlueCar(250, 35, 90, 0.5, 0))
                            // .add(positionFrameBlueCar(120, 240, 180, 0.5, 1))
                            // .add(positionFrameBlueCar(-120, 140, 260, 0.5, 1.8))
                            // .add(positionFrameBlueCar(120, 240, 180, 0.5, 2.8))
                            // .add(positionFrameBlueCar(250, 35, 90, 0.5, 4.1))
                        // // winner
                        greenCar.call(stateGreenCar, [true, 7.7, "Power1.easeOut", -1.33, -0.17])
                            .add(positionFrameGreenCar(250, 35, 90, 0.5, 0))
                            // .add(positionFrameGreenCar(-0, -60, 0, 0.5, 1.3))
                            // .add(positionFrameGreenCar(-130, 130, -100, 0.5, 1.8))
                            // .add(positionFrameGreenCar(30, -75, 0, 0.5, 2.8))
                            // .add(positionFrameGreenCar(250, 35, 90, 0.5, 4.5))
                    }
                }
            }
        // }, 1000)

    }, [showTrack]);

    useEffect(() => {
        return () => {
            dispatch(hideTrackRace())
        }
    }, [])

    return (
        <div className={"race-track " + (showTrack ? 'open' : '')} ref={textRef}>
            { showTrack && showTrack.w ? <div className="race-track-header">
                <div className="header-racer blue">
                    <div className="header-racer-header">
                        <span>Racer 1</span>
                        <div className="bet">
                            <Fuel/>
                            <span>{(new Intl.NumberFormat('ru-RU').format(+(showTrack.f_p.b_a)).toString().replace(',', '.'))}</span>
                        </div>
                    </div>
                    <div className="header-racer-body">
                        <img src={showTrack.f_p.a} alt="" />
                        <span>{showTrack.f_p.u}</span>
                    </div>
                </div>
                <div className="header-racer red">
                    <div className="header-racer-header">
                        <span>Racer 2</span>
                        <div className="bet">
                            <Fuel/>
                            <span>{(new Intl.NumberFormat('ru-RU').format(+(showTrack.s_p.b_a)).toString().replace(',', '.'))}</span>
                        </div>
                    </div>
                    <div className="header-racer-body">
                        <img src={showTrack.s_p.a} alt="" />
                        <span>{showTrack.s_p.u}</span>
                    </div>
                </div>
            </div> : '' }
            {showTrack ? (showTrack.r_i % 2 === 0 ? <Track /> : <Track2/> ) : ''}
        </div>
    );
}