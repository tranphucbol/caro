import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '../utils/utils';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
        }} />
    )} />
)

export default PrivateRoute