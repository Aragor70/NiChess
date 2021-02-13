import { Init_Board, Set_Move } from "../actions/board/types"


const initialState = {
    fields: []
}

const boardReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action

    switch (type) {
        case Init_Board: 
        return { ...state, fields: payload }

        case Set_Move:
        return { ...state, fields: state.fields.map((field: any) => field.position.x === payload.next.position.x ? {...field, player: payload.selected.player, type: payload.selected.type} : field ).map((field: any) => field.position.x === payload.selected.position.x ? {...field, player: null, type: null} : field ) }

        default:
            return state;
    }
}
export default boardReducer;