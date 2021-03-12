import { Draw, Get_Game, Init_Board, Set_Move, Set_Promotion, Surrender, Init_Single_Game, Add_Move } from "../actions/board/types"


const initialState = {
    fields: [],
    game: null,
    loading: true
}

const boardReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action

    switch (type) {
        case Init_Board:
        return { ...state, fields: payload, loading: false }

        case Init_Single_Game:
        return { ...state, game: payload, loading: false }

        case Get_Game: 
        return { ...state, game: payload, loading: false }
        
        case Set_Promotion: 
        return { ...state, game: payload, loading: false }

        case Set_Move:
        return { ...state, fields: state.fields.map((field: any) => field.position.x === payload.next.position.x ? {...field, player: payload.selected.player, type: payload.selected.type} : field ).map((field: any) => field.position.x === payload.selected.position.x ? {...field, player: null, type: null} : field ), loading: false }


        case Add_Move:
        return { ...state, game: {...state.game, board: state.game.board.map((field: any) => field.position.x === payload.next.position.x ? {...field, player: payload.selected.player, type: payload.selected.type} : field ).map((field: any) => field.position.x === payload.selected.position.x ? {...field, player: null, type: null} : field )}, loading: false }

        case Draw:
        case Surrender:
        return { ...state, game: payload, loading: false }

        default:
            return state;
    }
}
export default boardReducer;