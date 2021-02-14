import { Dispatch } from "redux"
import axios from "axios";
import { Log_In, Sign_Up, Load_User, Auth_Error } from "./types";
import setAuthToken from "../../../utils/setAuthToken";

const loadUser = () => async(dispatch: Dispatch<any>) => {

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    const res = await axios.get('/api/auth');
    dispatch({ type: Load_User, payload: res.data })


}

export const login = ( formData: any ) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/auth', formData, config)
        
        dispatch({ type: Log_In, payload: res.data })

        loadUser()

    } catch (err) {
        dispatch({ type: Auth_Error })
    }
}

export const signup = ( formData: any ) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/users', formData, config)

        dispatch({ type: Sign_Up, payload: res.data })

        loadUser()

    } catch (err) {
        dispatch({ type: Auth_Error })
    }
}