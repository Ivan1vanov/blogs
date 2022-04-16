import { TypeAction, UserActionTypes, UserState, IUser } from '../types/user.types';


const initializeState = {
    error: null,
    auth: []
}


export const userReducer = (state = initializeState, action: TypeAction) => {
        switch (action.type) {

            case UserActionTypes.AUTH:
                localStorage.setItem('userTask', JSON.stringify(action.payload))
            return {auth: action.payload, error: null}

            case UserActionTypes.SOME_ERROR:
            return {error: action.payload}

            case UserActionTypes.LOGOUT: 
                localStorage.clear()
            return {auth: {}}
            default: 
            return state
        }
}