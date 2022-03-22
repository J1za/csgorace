import React, { useEffect, useRef } from 'react'

import Select from '../components/Select'
import WithdrawItem from '../components/WithdrawItem'
import ButtonYellow from '../components/ButtonYellow'

import { useSelector, useDispatch } from 'react-redux'
import { changeMax, changeMin, changeOrder, changeSearch, getWithdrawHandler, setSelected, outWithdrawHandler, showMobileWithdraws } from '../redux/actions'
import { useTranslation } from 'react-i18next'

import { orderSelect } from '../utilites/selects'

import {ReactComponent as Fuel } from '../assets/fuel.svg'
import {ReactComponent as Search } from '../assets/search.svg'

import Steam from '../assets/steam.png'

import './Withdraw.scss'

export default function Withdraw(){


    const dispatch = useDispatch()
    const skins = useSelector(state => state.withdraw.skins)
    const loading = useSelector(state => state.withdraw.loading)
    const filter = useSelector(state => state.withdraw.filter)
    const selected = useSelector(state => state.withdraw.selected)
    const withdraw = useSelector(state => state.withdraw.withdraw)
    const banner = useSelector(state => state.app.banner)
    const selectedPrice = useSelector(state => state.withdraw.selectedPrice)

    const last = useRef()

    const search = () => {
        dispatch(getWithdrawHandler(orderSelect, 0, false))
        dispatch(setSelected('clear'))
    }

    const scroll = () => {
        if(last.current && !loading){
            if(window.innerHeight > last.current.getBoundingClientRect().top - 100){
                dispatch(getWithdrawHandler(orderSelect, true))
            }
        }
    }

    const { t } = useTranslation(['withdraw'])

    useEffect(() => {
        search()
        window.addEventListener('wheel', scroll)
        return () => window.removeEventListener('wheel', scroll)
        //eslint-disable-next-line
    }, [filter])

    return (
        <div className={"withdraw " + (banner ? 'withdraw-banner' : '')}>
            <div className="withdraw-header">
                <h1>Withdraw <ButtonYellow onClick={() => {
                    if(selected.length){
                        selected.forEach(elem => dispatch(outWithdrawHandler(elem.item_id, elem.price)))
                        dispatch(setSelected('clear'))
                    }
                }} disabled={selected.length === 0}>{t('withdraw:withdraw')} {(selectedPrice).toFixed(2)} <Fuel/></ButtonYellow></h1>
                <div className="title">{t('withdraw:search')}</div>
            </div>
            <div className="withdraw-body">
                <div className="skins">
                    <div className="skins-filter">
                        <div className="form-wrapper">
                            <div className="search-name">
                                <Search/>
                                <input type="text" className={'text'} value={filter.search} onInput={event => dispatch(changeSearch(event.target.value))} placeholder={t('withdraw:search')} />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <span className="form-wrapper-title">{t('withdraw:price')}</span>
                            <input type="text" id="min" className={"price min"} step="0.01" min="0.01" value={filter.min} onInput={event => dispatch(changeMin(event.target.value))} placeholder={t('withdraw:min')} />
                            <input type="text" id="max" className={"price max"} step="0.01" min="0.01" value={filter.max} onInput={event => dispatch(changeMax(event.target.value))} placeholder={t('withdraw:max')} />
                        </div>
                        <div className="form-wrapper">
                        <span className="form-wrapper-title">{t('withdraw:sort')}</span>
                            <Select defaultText={''} list={orderSelect.map(item => ({...item, name : t('withdraw:' + item.translate)}))} active={filter.order} handler={ id => dispatch(changeOrder(id)) }/>
                        </div>
                    </div>
                    <div className="skins-sort">
                        <Select defaultText={''} title={t('withdraw:order')} list={orderSelect.map(item => ({...item, name : t('withdraw:' + item.translate)}))} active={filter.order} handler={ id => dispatch(changeOrder(id)) }/>
                        <ButtonYellow onClick={() => {
                            if(selected.length){
                                selected.forEach(elem => dispatch(outWithdrawHandler(elem.item_id, elem.price)))
                                dispatch(setSelected('clear'))
                            }
                        }} disabled={selected.length === 0}>{t('withdraw:withdraw')} {(selectedPrice).toFixed(2)} <Fuel/></ButtonYellow>
                        <button className={'current-popup'} onClick={() => dispatch(showMobileWithdraws())}>{t('withdraw:current')} ({withdraw.length})</button>
                    </div>
                    <ul className="skins-list">
                        {skins.map((item, index) => <li ref={index === skins.length - 1 ? last : null} className={'skin ' + (selected.find(elem => elem.item_id === item.item_id) ? 'active' : '')} key={index} onClick={() => dispatch(setSelected(item))}>
                            {/* <Star/> */}
                            <div className="name">{item.name.split('(')[0]}</div>
                            <div className="title">{item.name.split('(')[1] ? item.name.split('(')[1].replace(')', '') : ''}</div>
                            <div className="image">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="price">
                                <div className="fuel">
                                    <Fuel/>
                                    {item.price}
                                </div>
                                <div className={"discount " + (item.discount > 0 ? 'green' : '')}>({item.discount > 0 ? '+' : ''}{item.discount || 0}%) <a onClick={event => event.stopPropagation()} rel="noreferrer" href={"https://steamcommunity.com/market/listings/730/" + item.name} target='_blank'> <img src={Steam} alt=""/></a></div> 
                            </div>
                        </li> )}
                    </ul>
                </div>
                <div className="current">
                    <div className="current-header">{t('withdraw:current')} ({withdraw.length})</div>
                    <ul className="current-list">
                        {selected.map((item, index) => <li className={'withdraw-item-to'} key={index}>
                            <div className="withdraw-item-to-body">
                                <img src={item.image} alt="" />
                                <div className="info">
                                    <div className="name">{item.name.split('(')[0]}</div>
                                    <div className="title">{item.name.split('(')[1] ? item.name.split('(')[1].replace(')', '') : ''}</div>
                                </div>
                            </div>
                            <div className="withdraw-item-to-nav">
                                <div className="fuel">
                                    <Fuel/>
                                    {item.price}
                                </div>
                                <div className="remove" onClick={() => dispatch(setSelected(item))}><span></span></div>
                            </div>
                        </li> )}
                        {withdraw.map(item => <WithdrawItem key={item.transaction_id} item={item}/>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}