

export interface UserInputData {
    name?: string,
    email: string,
    password: string
}

export enum UserActionTypes {
    AUTH='AUTH',
    SOME_ERROR = 'SOME_ERROR',
    LOGOUT='LOGOUT'
}

export interface IUser {
    _id: string
    name?: string
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface LoginedUser {
    userData: IUser,
    token: string
}

export interface RegisterUser {
    type: UserActionTypes.AUTH,
    payload: IUser
}

export interface LogoutUser {
    type: UserActionTypes.LOGOUT,
    payload: []
}

export interface LoginUser {
    type: UserActionTypes.AUTH,
    payload: IUser
}

export interface SomeError {
    type: UserActionTypes.SOME_ERROR,
    payload: string
}

export interface UserState {
    user?: LoginedUser,
    error?: string
}

export type TypeAction = RegisterUser | LoginUser | SomeError | LogoutUser