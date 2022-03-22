import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'

//eslint-disable-next-line
export default ({children,  path, streamer = false}) => {

    const user = useSelector( state => state.app.user )
    const onLoad = useSelector( state => state.app.onLoad )

    if(!onLoad) return false

    return (
        <Route exact path={path}>
            { user ? (streamer ? (user?.permissions.status === 2 ? children : <Redirect to='/'/> ) : children) : <Redirect to='/'/> }
        </Route>
    )
}