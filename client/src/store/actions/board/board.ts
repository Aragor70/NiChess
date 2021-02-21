import axios from 'axios';
import { Dispatch } from 'redux';
import { getTable } from '../table/table';
import { Get_Game, Init_Board } from './types';



export const initBoard = (players: any[], table: any) => async(dispatch: Dispatch<any>) =>{

    const { _id } = table
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/games', { players, tableid: _id }, config )
    
        dispatch({ type: Init_Board, payload: res.data.board })
        dispatch(getTable(_id))
    } catch (err) {
        console.log(err)
    }

    

}

export const getGame = (gameid: string) => async(dispatch: Dispatch<any>) => {

    try {
        const res = await axios.get(`/api/games/${gameid}`)
        

        dispatch({ type: Get_Game, payload: res.data })

    } catch (err) {
        console.log(err)
    }


}