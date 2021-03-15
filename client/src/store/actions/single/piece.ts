
import { Dispatch } from "redux";
import { Add_Move } from "../board/types";

export const addMove = (turn: any, selected: any, next: any) => async(dispatch: Dispatch<any>) => {

    console.log(selected, 'selected')
    console.log(next, 'next')
    dispatch({ type: Add_Move, payload: { selected, next, turn } })

}