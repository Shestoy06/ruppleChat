import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/const";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    }
]

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: <Chat/>
    }
]
