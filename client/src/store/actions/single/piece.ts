
import { Dispatch } from "redux";
import { Add_Move } from "../board/types";

export const addMove = (selected: any, next: any,) => async(dispatch: Dispatch<any>) => {

    

    dispatch({ type: Add_Move, payload: { selected, next } })

}