import { Dispatch } from "redux"
import axios from "axios";
import { Log_In, Sign_Up, Load_User, Auth_Error, Log_Out } from "./types";
import setAuthToken from "../../../utils/setAuthToken";

export const loadUser = () => async(dispatch: Dispatch<any>) => {

    if (localStorage.token) {
        await setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');

        return dispatch({ type: Load_User, payload: res.data })

    } catch (err) {
        dispatch({ type: Auth_Error })
    }
}

export const login = ( formData: any, history: any ) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/auth', formData, config)
        
        dispatch({ type: Log_In, payload: res.data })

        dispatch(loadUser())

        history.push('/')

    } catch (err) {
        dispatch({ type: Auth_Error })
    }
}

export const signup = ( formData: any, history: any ) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/users', formData, config)

        dispatch({ type: Sign_Up, payload: res.data })

        dispatch(loadUser())
        history.push('/')

    } catch (err) {
        dispatch({ type: Auth_Error })
    }
}

export const guestAuth = (history: any) => async(dispatch: Dispatch<any>) => {
    try {
        const res = await axios.post('/api/users/guests')

        dispatch({ type: Log_In, payload: res.data })

        dispatch(loadUser())
        history.push('/')

    } catch (err) {
        dispatch({ type: Auth_Error })
    }
}


export const logout = (history: any) => async(dispatch: Dispatch<any>) => {
    try {
        
        await dispatch({ type: Log_Out })

        history.push('/')

    } catch (err) {
        dispatch({ type: Auth_Error })
    }
}