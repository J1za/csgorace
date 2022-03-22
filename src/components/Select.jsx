import React, { useState, useRef, useEffect } from 'react'

import {ReactComponent as Arrow } from '../assets/arrow-down.svg'
import {ReactComponent as Percent } from '../assets/percent-icon.svg'

import './Select.scss'
//eslint-disable-next-line
export default ({ active = null, list = [], handler = () => false, defaultText = '', title = ''}) => {

    const [ isOpen, setIsOpen ] = useState(false)
    const select = useRef()


    useEffect(() => {
        const click = event => select?.current?.contains(event.target) || setIsOpen(false)
        document.addEventListener('click', click)
        return () => document.removeEventListener('click', click)
    }, [])

    return (
        <div className={"select " + (isOpen ? 'active' : '')} onClick={() => setIsOpen(prev => !prev)} ref={select}>
            <div className="select-active"> <div className="title">{title}</div> <span>{list.find(item => item.id === active)?.name || defaultText}</span><Arrow/></div>
            <ul className="select-list">
                {list.map(item => <li 
                    className={"select-list-item " + (active === item.id ? 'active' : '')}
                    onClick={() => handler(item.id)}
                    key={item.id}>{item.icon ? <Percent/> : ""}{item.name}</li>)}
            </ul>
        </div>
    )
}