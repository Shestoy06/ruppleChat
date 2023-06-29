import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/const";
import { Navigate } from "react-router-dom";
import {connect} from "react-redux";

const AppRouter = (props) => {

    const userAuth = props.userData.id

    const privateRoutesMap = privateRoutes
        .map( route => {
            return (
                <Route path={route.path} element={route.Component} {...props}/>
            )
        })
    const publicRoutesMap = publicRoutes
        .map( route => {
            return (
                <Route path={route.path} element={route.Component} {...props}/>
            )
        })

    if (userAuth) {

        return (
            <Routes>
                {privateRoutesMap}
                <Route path='*' replace element={<Navigate to={CHAT_ROUTE} />}/>
            </Routes>
        )

    } else {

        return (
            <Routes>
                {publicRoutesMap}
                <Route path='*' replace element={<Navigate to={LOGIN_ROUTE} />}/>
            </Routes>
        );

    }


};

const mapStateToProps = (state) => ({
    userData: state.userReducer
})

export default connect(mapStateToProps, {})(AppRouter);
