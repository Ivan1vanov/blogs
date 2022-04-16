import axios from "axios";
import { IUser, UserInputData } from '../store/types/user.types';



const API = axios.create({baseURL: 'http://localhost:5001/'})

export const registerUserAPI = (data: UserInputData) => API.post('api/user/register', data)
export const loginUserAPI = (data: UserInputData) => API.post('api/user/login', data)