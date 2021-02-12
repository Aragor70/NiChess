import { Init_Board } from "../actions/board/types"


const initialState = {
    fields: []
}

const boardReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action

    switch (type) {
        case Init_Board: 
        return { ...state, fields: payload }

        default:
            return state;
    }
}
export default boardReducer;