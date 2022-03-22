import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLevel } from '../../redux/actions'
import { useTranslation } from 'react-i18next'
import Popup from './Popup'

import ButtonYellow from '../ButtonYellow'

import { ReactComponent as Flags } from '../../assets/flags-level.svg'

import Car1 from '../../assets/level/1.png'
import Car2 from '../../assets/level/2.png'
import Car3 from '../../assets/level/3.png'
import Car4 from '../../assets/level/4.png'
import Car5 from '../../assets/level/5.png'
import Car6 from '../../assets/level/6.png'
import Car7 from '../../assets/level/7.png'
// import Car8 from '../../assets/level/8.png'
// import Car9 from '../../assets/level/9.png'
// import Car10 from '../../assets/level/10.png'
// import Car11 from '../../assets/level/11.png'
// import Car12 from '../../assets/level/12.png'
// import Car13 from '../../assets/level/13.png'

import './Level.scss'
//eslint-disable-next-line
export default () => {

    const levelPopup = useSelector(state => state.popup.level)
    const user = useSelector(state => state.app.user)
    const dispatch = useDispatch()
    const { t } = useTranslation(['main'])

    if(!user) return false

    return (
        <Popup popup={levelPopup} handler={hideLevel} className={'level-popup'}>
            <Flags className="flags"/>
            <div className="level-popup-new">{t('main:levelPopup.newLevel')}</div>
            <div className="level-popup-level">{user.level}</div>
            <div className="level-popup-open">{t('main:levelPopup.open')}</div>
            <div className="level-popup-car">
                <img src={( user.level < 10 ? Car1 : user.level < 20 ? Car2 : user.level < 40 ? Car3 : user.level < 60 ? Car4 : user.level < 80 ? Car5 : user.level < 90 ? Car6 : user.level <= 100 ? Car7 : '' )} alt="" />
                    <div className="blur"></div>
            </div>
            <ButtonYellow className={"level-popup-continue"} onClick={() => dispatch(hideLevel())}>{t('main:levelPopup.continue')}</ButtonYellow>
        </Popup>
    )
}