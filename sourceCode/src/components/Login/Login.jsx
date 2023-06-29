import React from 'react';
import s from './Login.module.css'
import {app} from "../../firebase";
import {setUser} from "../../redux/user-reducer";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {connect} from "react-redux";
import googleIcon from "../../Google__G__Logo.svg.png"



const Login = (props) => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    function signIn() {
        signInWithPopup(auth, provider)
            .then(response => {
                const userData = response.user
                props.setUser(userData.email, userData.uid, userData.displayName, userData.photoURL)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className={s.login}>
            <div className={s.inner}>
                <span className={s.welcome}>Welcome to <span className={s.rupplechat}>ruppleChat</span></span>
                <button onClick={signIn}><img className={s.icon} src={googleIcon} alt=""/>Sign In with Google Account</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
        userData: state.userReducer
})




export default connect(mapStateToProps, {setUser})(Login);