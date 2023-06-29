import React, {Component} from 'react';
import s from './Chat.module.css'
import {connect} from "react-redux";
import {addMessage, setMessages, unsetMessages, updateMessage} from "../../redux/messages-reducer";
import { collection, addDoc, doc, onSnapshot, query, serverTimestamp, orderBy  } from "firebase/firestore";
import {db, getMessages} from "../../firebase";
import profileImage from './../../defaultUser.webp'
import AnimateHeight from "react-animate-height";

class Chat extends Component  {

    componentWillMount() {
        this.props.unsetMessages()
        const messagesRef = collection(db, "messages")
        const q = query(messagesRef, orderBy('createdAt'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                    if (change.type === "added" && change.doc.data().message !== '') {
                        this.props.setMessages(change.doc.data());
                    }
                }
            )
        })
    }

    textInput = React.createRef();

    addMessageFunc = async (e) => {
        const inputMessage = this.textInput.current.value
        this.textInput.current.value = ''
        const docRef = await addDoc(collection(db, "messages"), {
            author: this.props.userData.id,
            message: inputMessage,
            createdAt: serverTimestamp(),
            photo: this.props.userData.photo,
            name: this.props.userData.name
        });

    }

    getMessages() {
        const messages = []
        let lastMessageID = ''
        this.props.chatData.messages.map((mes, index, elements) => {
            if (mes.author === this.props.userData.id) {
                messages.push(<span className={s.message} key={mes.id}>{mes.message}</span>)
            } else if (mes.author === lastMessageID) {
                messages.push(
                    <div className={s.friendInfo}>
                        <div className={s.friendMessage}>
                            <div className={s.userPhoto}></div>
                            <span className={s.message_friend} key={mes.id}>{mes.message}</span>
                        </div>
                    </div>
                )
            } else {
                messages.push(
                    <div className={s.friendInfo}>
                        <span className={s.friendName}>{mes.name}</span>
                        <div className={s.friendMessage}>
                            <img className={s.userPhoto} src={profileImage} alt=""/>
                            <span className={s.message_friend} key={mes.id}>{mes.message}</span>
                        </div>
                    </div>
                )
            }
            lastMessageID = mes.author
        })
        return messages
    }

    render() {
        return (
            <AnimateHeight
                duration={500}
                height={'auto'}
            >
                <div className={s.chat}>
                    <div className={s.messages}>
                        {this.getMessages().reverse()}
                    </div>
                    <div className={s.form}>
                        <input className={s.input} placeholder='New message...' ref={this.textInput}
                               onChange={this.updateMessageInput} type="text"/>
                        <button className={s.button} onClick={this.addMessageFunc}><span>Send</span></button>
                    </div>
                </div>
            </AnimateHeight>
        );
    }

};

const mapStateToProps = (state) => ({
    chatData: state.messagesReducer,
    userData: state.userReducer
})

export default connect(mapStateToProps, {updateMessage, addMessage, setMessages, unsetMessages})(Chat);