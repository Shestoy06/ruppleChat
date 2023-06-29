import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/const";
import {connect} from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import {unsetUser} from "../../redux/user-reducer";
import {unsetMessages} from "../../redux/messages-reducer";

const Navbar = (props) => {

    const userAuth = props.userData.id

    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            props.unsetUser()
            //props.unsetMessages()
        }).catch((error) => {
            console.log(error)
        });

    }

    return (
        <header className={s.header}>
            <div className={s.info}>
                <span className={s.logo}>rupple</span>
                {userAuth ? <div  className={s.withLove}>Made with ❤️ by Andrei Silin</div> : <NavLink to={LOGIN_ROUTE}><button className={s.login}>LogIn</button></NavLink> }
            </div>
        </header>
    );
};

const mapStateToProps = (state) => ({
    userData: state.userReducer
})

export default connect(mapStateToProps, {unsetUser, unsetMessages})(Navbar);