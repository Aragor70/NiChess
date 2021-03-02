import axios from "axios";
import { Dispatch } from "redux";
import { Create_Table, Join_To_Table, Leave_From_Table, Delete_Table, Table_Error, Get_Tables, Get_Table, Set_Player } from "./types";


export const getTables = () => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.get('https://nichess.herokuapp.com/api/tables')

        dispatch({ type: Get_Tables, payload: res.data })
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const getTable = (id: string) => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.get(`https://nichess.herokuapp.com/api/tables/${id}`)

        dispatch({ type: Get_Table, payload: res.data })
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const createTable = (formData: any, history: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('https://nichess.herokuapp.com/api/tables', formData, config)

        dispatch({ type: Create_Table, payload: res.data })

        dispatch(history.push(`/tables/${res.data._id}`))

    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const joinToTable = (id: string, history: any) => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.post(`https://nichess.herokuapp.com/api/tables/${id}`);

        dispatch({ type: Join_To_Table, payload: res.data })
        dispatch(history.push(`/tables/${id}`))

    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const setPlayer = (id: string, player: number) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`https://nichess.herokuapp.com/api/tables/${id}`, { player }, config);

        dispatch({ type: Set_Player, payload: res.data })

    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const leaveFromTable = (id: string, history: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`https://nichess.herokuapp.com/api/tables/${id}`, { leave: true }, config);

        dispatch({ type: Leave_From_Table, payload: res.data })
        dispatch(getTables())
        dispatch(history.push('/'))

    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const deleteTable = (id: string, history: any) => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.delete(`https://nichess.herokuapp.com/api/tables/${id}`);

        dispatch({ type: Delete_Table, payload: { id, table: res.data } })
        dispatch(history.push('/'))
    
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}