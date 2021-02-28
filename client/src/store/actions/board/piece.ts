import axios from "axios";
import { Dispatch } from "react";
import { getGame } from "./board";
import { Get_Game, Set_Move, Set_Promotion } from './types';


export const isCorrectMove = (selected: any, next: any, fields: any[]) => {
    try {
        
        if (selected.player == 1) {

            if ( selected.type === 'Pawn' ) {

                const diff = selected.position.x - next.position.x


                if (selected.position.y === 6 && diff === 16) {


                    if (fields[selected.position.x - 8].player) {
                        console.log('collision')
                        return false
                    }


                    return true
                }

                if ( diff !== 8) {
                    throw new Error()
                }


                
                
            }
        }

        if (selected.player === 2) {

            if ( selected.type === 'Pawn' ) {

                const diff = selected.position.x - next.position.x

                if (selected.position.y === 1 && diff === -16) {

                    if (fields[selected.position.x + 8].player) {
                        console.log('collision')
                        return false
                    }


                    return true
                }

                if ( diff !== -8) {
                    throw new Error()
                }
                
                
            }
        }

        if ( selected.type === 'Rook' ) {

            const diff = Math.abs(selected.position.x - next.position.x)
            
            if (selected.position.x !== next.x) {
                if (diff % 8 !== 0 && selected.position.y !== next.position.y) {
                    throw new Error()
                }
            }

            for (let i = 0; i < diff; i++) {


                if (selected.position.x > next.position.x) {

                    if (i % 8 == 0 && i > 0) {

                        if (fields[next.position.x + i].player) {
                            console.log('collision')
                            return false
                        }
                    }

                    if (selected.position.y === next.position.y) {

                        if (fields[next.position.x + i].player) {
                            console.log('collision')
                            return false
                        }


                    }

                } else {

                    if (i % 8 == 0 && i > 0) {

                        if (fields[next.position.x - i].player) {
                            console.log('collision')
                            return false
                        }
    
                    }

                    if (selected.position.y === next.position.y) {

                        if (fields[next.position.x - i].player) {
                            console.log('collision')
                            return false
                        }

                    }
                }

                



            }

        }

        if ( selected.type === 'Jumper' ) {

            const diff = Math.abs(selected.position.x - next.position.x)

            
            if (diff !== 17 && diff !== 10 && diff !== 15 && diff !== 6) {
                throw new Error()
            }
            
            
        }

        if ( selected.type === 'Bishop' ) {

            const diff = Math.abs(selected.position.x - next.position.x)

            
            if (diff % 9 !== 0 && diff % 7 !== 0) {
                throw new Error()
            }

            for (let i = 0; i < diff; i++) {

                if (selected.position.x > next.position.x) {
                    

                
                    if (diff % 9 === 0 && i % 9 == 0) {

                        if (fields[next.position.x + i ].player && i > 0) {
                            console.log('collision')
                            return false
                        }

                    }
                    if (diff % 7 === 0 && i % 7 == 0) {

                        if (fields[next.position.x + i ].player && i > 0) {
                            console.log('collision')
                            return false
                        }

                    }
                }
                else {
                    console.log('bishop down')



                
                    if (diff % 9 === 0 && i % 9 == 0) {

                        if (fields[next.position.x - i].player && i > 0) {
                            console.log('collision')
                            return false
                        }

                    }
                    if (diff % 7 === 0 && i % 7 == 0) {

                        if (fields[next.position.x - i].player && i > 0) {
                            console.log('collision')
                            return false
                        }

                    }
                }

            }

            
        }

        if ( selected.type === 'Queen' ) {

            const diff = Math.abs(selected.position.x - next.position.x)
            
            
            
            if (diff % 9 !== 0 && diff % 7 !== 0 && selected.position.y !== next.position.y && diff % 8 !== 0) {
                throw new Error()
            }

            for (let i = 0; i < diff; i++) {

                if (selected.position.x > next.position.x) {
                    if (diff % 9 === 0 && i % 9 == 0) {

                        if (fields[next.position.x + i].player && i > 0) {
                            console.log('collision')
                            return false
                        }
    
                    }
                    if (diff % 7 === 0 && i % 7 === 0) {
    
                        if (fields[next.position.x + i].player && i > 0) {
                            console.log('collision')
                            return false
                        }
    
                    }
                    if (diff % 8 === 0 && i % 8 === 0) {
    
                        if (fields[next.position.x + i].player && i > 0) {
                            console.log('collision')
                            return false
                        }
    
                    }


                } else {
                    if (diff % 9 === 0 && i % 9 == 0) {
                        
                        if (fields[next.position.x - i].player && i > 0) {
                            console.log('collision')
                            return false
                        }
    
                    }
                    if (diff % 7 === 0 && i % 7 === 0) {
    
                        if (fields[next.position.x - i].player && i > 0) {
                            console.log('collision')
                            return false
                        }
    
                    }
                    if (diff % 8 === 0 && i % 8 === 0) {
    
                        if (fields[next.position.x - i].player && i > 0) {
                            console.log('collision')
                            return false
                        }
    
                    }
                }


                
                if (selected.position.y === next.position.y) {
                    

                    if (selected.position.x > next.position.x) {
                        
                        if (fields[next.position.x + i ].player ) {
                            console.log('collision')
                            return false
                        }
                        
                    }

                    else if (selected.position.x < next.position.x) {

                        if (fields[next.position.x - i ].player ) {
                            console.log('collision')
                            return false
                        }
                        
                    }
                }


            }

        }

        if ( selected.type === 'King' ) {

            const diff = Math.abs(selected.position.x - next.position.x)

            if (diff !== 1 && diff !== 8 && diff !== 7 && diff !== 9) {
                throw new Error()
            }

            
        }

        return true;

    } catch (err) {
        
        return false
    }

}

export const setMove = (selected: any, next: any, id: string, socket: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {

        const res = await axios.put(`/api/games/${id}`, { selected, next }, config)
        
        dispatch({ type: Set_Move, payload: res.data })
        dispatch(getGame(id))

        socket.emit('movement', ('hi'))

        return true
    } catch (err) {
        return false
    }
}

export const setPromotion = (position: any, promotion:string, id: string, socket: any) => async(dispatch: Dispatch<any>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {

        const res = await axios.put(`/api/games/${id}`, { position, promotion }, config)
        
        dispatch({ type: Set_Promotion, payload: res.data })
        dispatch(getGame(id))

        socket.emit('movement', ('hi'))

        return true
    } catch (err) {
        return false
    }
}