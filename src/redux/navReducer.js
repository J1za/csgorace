import React from 'react'
import { NAV } from './types'


import { ReactComponent as Games } from '../assets/nav/games.svg'
import { ReactComponent as Support } from '../assets/nav/support.svg'
import { ReactComponent as Top } from '../assets/nav/top.svg'
import { ReactComponent as Free } from '../assets/nav/free.svg'
import { ReactComponent as Logout } from '../assets/nav/logout.svg'
import { ReactComponent as Ref } from '../assets/nav/ref.svg'
let initialState = {
    nav: [
        {
            icon: <Games/>,
            link: '/streetrace',
            translate: 'games',
            active: window.location.pathname === '/streetrace' || window.location.pathname === '/crash' || window.location.pathname === '/race' || window.location.pathname === '/roulette' || window.location.pathname === '/'
        },
        {
            icon: <Top/>,
            link: '/tot',
            translate: 'top',
            active: window.location.pathname.includes('tot')
        },
        {
            icon: <Free/>,
            link: '/free',
            translate: 'free',
            active: window.location.pathname.includes('free')
        },
        {
            icon: <Ref/>,
            link: '/refferals',
            translate: 'ref',
            refferal: true,
            active: window.location.pathname.includes('refferals')
        },
        {
            icon: <Support/>,
            link: '/faq',
            translate: 'support',
            active: window.location.pathname.includes('ticket') || window.location.pathname.includes('faq')
        },
        {
            icon: <Logout/>,
            link: '',
            translate: 'logout',
            logout: true,
            active: false
        }
    ]
}

export const navReducer = (state = initialState, action) => {
    switch(action.type){
        case NAV: 
            return {...state, nav: state.nav.map((item, index) => ({...item, active: index === action.payload.index}))}
        default: 
            return state
    }
}