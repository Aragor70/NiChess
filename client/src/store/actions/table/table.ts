import axios from "axios";
import { Dispatch } from "redux";
import { Create_Table, Join_To_Table, Leave_From_Table, Delete_Table, Table_Error, Get_Tables, Get_Table } from "./types";


export const getTables = () => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.get('/api/tables')

        dispatch({ type: Get_Tables, payload: res.data })
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const getTable = (name: string) => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.get(`/api/tables/${name}`)

        dispatch({ type: Get_Table, payload: res.data })
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const createTable = () => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.post('/api/tables')

        dispatch({ type: Create_Table, payload: res.data })
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const joinToTable = (id: string) => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.post(`/api/tables/${id}`);

        dispatch({ type: Join_To_Table, payload: res.data })
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const leaveFromTable = (id: string) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`/api/tables/${id}`, { leave: true }, config);

        dispatch({ type: Leave_From_Table, payload: res.data })
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}

export const deleteTable = (id: string) => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.delete(`/api/tables/${id}`);

        dispatch({ type: Delete_Table, payload: { id, table: res.data } })
    
    } catch (err) {
        dispatch({ type: Table_Error })
    }
    
}