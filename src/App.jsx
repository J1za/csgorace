import React, { useEffect } from "react";


import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'

import { init } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { STREAMER } from "./redux/types";

import RouteAuth from './components/RouteAuth'


// import Context from './context/AppContext'

import Wrapper from './components/Wrapper'
import Loader from "./components/Loader";

import Support from "./views/Support";
import Ticket from "./views/Ticket";
import Tickets from "./views/Tickets";
import Top from './views/Top'
import Withdraw from './views/Withdraw'
import Tos from './views/Tos'
import Provably from './views/Provably'
import Profile from './views/Profile'
import Privacy from './views/Privacy'
import Refferals from './views/Refferals'
import Roulette from './views/Roulette'
import Streetrace from './views/Streetrace'
import Race from './views/Race'
import Crash from './views/Crash'
import Free from './views/Free'

import MobileMenu from "./components/Popups/MobileMenu";
import MobileChat from './components/Popups/MobileChat'
import MobileNotification from "./components/Popups/MobileNotification";

import CreateTicket from './components/Popups/CreateTicket'
import CreatedTicket from './components/Popups/CreatedTicket'
import RoundDetail from './components/Popups/RoundDetail'
import ChatRules from './components/Popups/ChatRules'
// import Trade from "./components/Popups/Trade";
import Deposit from './components/Popups/Deposit'
import Level from "./components/Popups/Level";
import Success from "./components/Popups/Success";
import Old from "./components/Popups/Old";
import CurrentWithdraws from "./components/Popups/CurrentWithdraws";
import StreetraceInfo from "./components/Popups/StreetraceInfo";
import FreeInfo from "./components/Popups/FreeInfo";

import Error from './components/Error'
import Banner from './components/Banner'



function App() {

	const dispatch = useDispatch()

	const loader = useSelector(state => state.app.loader)
	const onLoad = useSelector(state => state.app.onLoad)
	const user = useSelector(state => state.app.user)

	const { i18n } = useTranslation()

	const streamerChange = event => {
		localStorage.setItem('streamer', event.storageArea.streamer || false)
		const streamer = localStorage.getItem('streamer') === 'false' || !localStorage.getItem('streamer') ? false : true
		if(streamer !== 'undefined'){
			dispatch({ type: STREAMER, payload: streamer })
		}
	}

	useEffect(() => {
		if(user) {
			i18n.changeLanguage(user.language)
		}
		//eslint-disable-next-line
	}, [user])

	useEffect(() => {
		dispatch(init())
		window.addEventListener('storage', streamerChange)
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`))

		//eslint-disable-next-line
	}, [])


	return (
		<Router>
			<MobileMenu/>
			<MobileChat/>
			<MobileNotification/>
			<CreateTicket/>
			<CreatedTicket/>
			<RoundDetail/>
			{/* <Mute/> */}
			<ChatRules/>
			<Success/>
			{/* <Trade/> */}
			<Deposit/>
			<Banner/>
			<CurrentWithdraws/>
			<Level/>
			{/* <DepositSuccess/> */}
			<StreetraceInfo/>
			<FreeInfo/>
			<Old/>
			<Error/>
			<Loader/>
			{onLoad ? <div className={"app " + (!loader ? 'hide' : '')}>
				<Wrapper>
				<Switch> 
					<Route exact path="/faq">
						<Support/>
					</Route>
					<RouteAuth exact path="/ticket/:id">
						<Ticket/>
					</RouteAuth>
					<RouteAuth exact path="/tickets/:mode">
						<Tickets/>
					</RouteAuth>
					<Route exact path="/tot">
						<Top/>
					</Route>
					<RouteAuth exact path="/withdraw">
						<Withdraw/>
					</RouteAuth>
					<Route exact path="/tos">
						<Tos/>
					</Route>
					<Route exact path="/fair">
						<Provably/>
					</Route>
					<Route exact path="/profile/:id">
						<Profile/>
					</Route>
					<Route exact path="/privacy">
						<Privacy/>
					</Route>
					<RouteAuth exact path="/profile/:id/refferals">
						<Refferals/>
					</RouteAuth>
					<RouteAuth exact path="/streamer" streamer={true}>
						<Refferals streamer={true}/>
					</RouteAuth>
					<Route exact path="/roulette">
						<Roulette/>
					</Route>
					<Route exact path="/streetrace">
						<Streetrace/>
					</Route>
					<Route exact path="/race">
						<Race/>
					</Route>
					<Route exact path="/crash">
						<Crash/>
					</Route>
					<Route exact path="/">
						<Redirect to="/streetrace"/>
					</Route>
					<RouteAuth exact path="/free">
						<Free/>
					</RouteAuth>
					{/* <Route exact path="/404">
						<ErrorPage/>
					</Route>
					<Route path="*">
						<Redirect to="/404"/>
					</Route> */}
				</Switch> 
				</Wrapper>
			</div> : '' }
		</Router>
	)
}

export default App;
