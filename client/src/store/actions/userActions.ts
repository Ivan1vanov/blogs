import { UserInputData, UserActionTypes } from '../types/user.types';
import * as api from '../../api/userApi'
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';



export const loginUserAction = (userData: UserInputData) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.loginUserAPI(userData)
        // console.log(data)
        dispatch({type: UserActionTypes.AUTH, payload: data})
    } catch (error: any) {
        const err = error as AxiosError
        if (err.response) {
            dispatch({type: UserActionTypes.SOME_ERROR, payload: err.response.data.message})
        }
        
    }
}

export const registrationAction = (userData: UserInputData) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.registerUserAPI(userData)
        // console.log(userData)
        dispatch({type: UserActionTypes.AUTH, payload: data})
    } catch (error: any) {
        const err = error as AxiosError
        if (err.response) {
            dispatch({type: UserActionTypes.SOME_ERROR, payload: err.response.data.message})
        }
    }
}