import { Create_Table, Delete_Table, Get_Tables, Join_To_Table, Leave_From_Table, Get_Table } from "../actions/table/types";



const initialState = {
    tables: [], 
    table: null
}

const tableReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action

    switch (type) {
        
        case Get_Tables:
            return {...state, tables: payload, table: null }

        case Get_Table:
            return {...state, table: payload }

        case Create_Table:
            return { ...state, tables: [...state.tables, payload], table: payload }

        case Leave_From_Table:
            return { ...state, table: null }

        case Join_To_Table:
            return { ...state, table: payload }

        case Delete_Table:
            return { ...state, tables: state.tables.filter((element: any) => element._id !== payload.id), table: null }

        default:
            return state;
    }
}
export default tableReducer;