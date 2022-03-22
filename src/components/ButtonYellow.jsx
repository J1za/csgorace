import React from 'react'

import './ButtonYellow.scss'
//eslint-disable-next-line
export default ({children, onClick = () => false, className = '', href = '', disabled = false}) => {
    if(href){
        return <a href={href} className={'yellow-button ' + className} onClick={onClick}> {children} </a>
    }
    return <button className={'yellow-button ' + className} onClick={onClick} disabled={disabled}> {children} </button>
}