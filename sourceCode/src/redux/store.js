import {combineReducers} from 'redux'
import {userReducer} from "./user-reducer";
import {configureStore} from "@reduxjs/toolkit";
import messagesReducer from "./messages-reducer";

const reducers = combineReducers({
    userReducer: userReducer,
    messagesReducer: messagesReducer
})

const store = configureStore({reducer: reducers, })

window.store = store
export default store