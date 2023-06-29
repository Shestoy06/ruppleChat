const UPDATE_MESSAGE_INPUT = 'UPDATE-MESSAGE-INPUT'
const ADD_MESSAGE = 'ADD-MESSAGE'
const SET_MESSAGES = 'SET-MESSAGES'
const UNSET_MESSAGES= 'UNSET-MESSAGES'

const initialState = {
    messages: [],
    messageInput: ''
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_INPUT:
            return {
                ...state,
                messageInput: action.text
            }

        case ADD_MESSAGE:
            return {
                ...state,
                messageInput: ''
            }

        case SET_MESSAGES:
            action.messages.createdAt = null
            return {
                ...state,
                messages: [...state.messages, action.messages]
            }

        case UNSET_MESSAGES:
            return {
                ...state,
                messages:[]
            }
        default:
            return state
    }
}

export const updateMessage = (text) => ({type: UPDATE_MESSAGE_INPUT, text})
export const addMessage = () => ({type: ADD_MESSAGE})
export const setMessages = (messages) => ({type: SET_MESSAGES, messages})
export const unsetMessages = () => ({type: UNSET_MESSAGES})

export default messagesReducer