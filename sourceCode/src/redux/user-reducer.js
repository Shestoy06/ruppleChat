export const SET_USER = 'SET-USER'
const UNSET_USER = 'UNSET-USER'

const initState = {
    email: null,
    id: null,
    name: null,
    photo: null
}

export const userReducer = (state = initState, action) => {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                email: action.email,
                id: action.id,
                name: action.name,
                photo:  action.photo
            }

        case UNSET_USER:
            return {
                ...state,
                email: null,
                id: null,
                name: null
            }
        default:
            return state

    }
}

export const setUser = (email, id, name, photo) => ({type: SET_USER, email, id, name, photo})
export const unsetUser = () => ({type: UNSET_USER})