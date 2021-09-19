import { isPotentialMove } from "./isPotentialMove"

export const isCorrectMove = async(selected: any, next: any, fields: any, user: any, player: any, isCheck = false, possibleWBlackMoves:any[], possibleWhiteMoves:any[], countPossibleMovements: any, players: any[]) => {

    const uid = user
    const borders = [0, 7, 8, 16, 24, 32, 40, 48, 56, 15, 23, 31, 39, 47, 55, 63, 56, 57]
    try {
        if (selected.type === 'King') {
            
            
            if (player === 1) {
                
                const isCollision = await possibleWBlackMoves.filter((element: any) => JSON.stringify(element.position) === JSON.stringify(next.position))[0]
                console.log(possibleWBlackMoves)
                if (isCollision) {
                    console.log('Ciao it is white collision at', next.position)
                    return false
                }
            }
            if (player === 2) {

                const isCollision = await possibleWhiteMoves.filter((element: any) => JSON.stringify(element.position) === JSON.stringify(next.position))[0]
                
                if (isCollision) {
                    console.log('Ciao it is black collision at', next.position)
                    return false
                }
            }

        }

        if (isCheck) {

            const newBoard = await fields.slice().map((element: any) => JSON.stringify(element.position) === JSON.stringify(selected.position) ? { ...element, type: null, player: null } : element)

            await countPossibleMovements({ players, board: newBoard })



            //


            const oppGame = players.filter((element: any) => element._id !== user)[0]

            const mePlayer = await newBoard.filter((element: any) => element.player === user)

            const opponentPlayer = await newBoard.filter((element: any) => element.player === oppGame._id)
            console.log('newBoard', newBoard)
            let blackMoves: any[] = []
            let whiteMoves: any[] = []

            let value = false

            await newBoard.forEach(async (boardElem: any) => {
                try {


                    await Promise.all(opponentPlayer.map( async ( opp: any ) => {

                        const { success, enemy } = await isPotentialMove(opp, boardElem, oppGame._id, [{ _id: user } , oppGame], newBoard, true)
    
                        if (success) {
                            if (boardElem.type === 'King') {
                                value = true;
                                throw new Error()
                            }
                            blackMoves = [...blackMoves, boardElem]
                        }
    
                    }));
                    await Promise.all(mePlayer.map( async ( me: any ) => {
    
                        const { success, enemy } = await isPotentialMove(me, boardElem, user, [{ _id: user }, oppGame], newBoard, true)
    
                        if (success) {
                            
                            if (boardElem.type === 'King') {
                                value = true
                                throw new Error()
                            }
    
                            whiteMoves = [...whiteMoves, boardElem]
                        }
    
                    }));


                } catch (err) {
                    return false;
                }


            });

            
            console.log('Checked', value)
            if (value) return false


            //

        }
 
        if (player == 1) {

            if ( selected.type === 'Pawn' ) {

                const diff = selected.position.x - next.position.x

                if (selected.position.y === 6 && diff === 16) {


                    if (fields[selected.position.x - 8].player) {

                        console.log('collision')
                        return false
                    }
                    if (fields[selected.position.x - 16].player) {

                        console.log('collision')
                        return false
                    }


                    return true
                }
                
                if (diff === 9 && fields[selected.position.x - 9].player) {
                    if (fields[selected.position.x - 9].player !== uid) {
                        return true
                    }
                }
                if (diff === 7 && fields[selected.position.x - 7].player) {
                    if (fields[selected.position.x - 7].player !== uid) {
                        return true
                    }
                }

                

                if ( diff !== 8) {
                    throw new Error()
                }

                if (fields[selected.position.x - 8].player) {

                    console.log('collision')
                    return false
                }

                
                
            }
        }

        if (player === 2) {

            if ( selected.type === 'Pawn' ) {

                const diff = selected.position.x - next.position.x

                if (selected.position.y === 1 && diff === -16) {

                    if (fields[selected.position.x + 8].player) {
                        console.log('collision')
                        return false
                    }
                    if (fields[selected.position.x + 16].player) {
                        console.log('collision')
                        return false
                    }


                    return true
                }

                

                if (diff === -9 && fields[selected.position.x + 9].player) {
                    if (fields[selected.position.x + 9].player !== uid) {
                        
                        return true
                    }
                }
                if (diff === -7 && fields[selected.position.x + 7].player) {
                    if (fields[selected.position.x + 7].player !== uid) {
                        console.log('hi')
                        return true
                    }
                }

                if ( diff !== -8) {
                    throw new Error()
                }

                if (fields[selected.position.x + 8].player) {
                    console.log('collision')
                    return false
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

                        if (fields[next.position.x + i].player === uid) {
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

                        if (fields[next.position.x - i].player === uid) {
                            console.log('collision')
                            return false
                        }

                    }
                }

                



            }

        }

        if ( selected.type === 'Knight' ) {

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

                        if (fields[next.position.x + i ].player ) {
                            if (fields[next.position.x + i ].player !== uid) {
                                return true
                            }
                            console.log('collision')
                            return false
                        }
                        if (next.color !== selected.color) {
                            return false
                        }

                    }
                    if (diff % 7 === 0 && i % 7 == 0) {

                        if (fields[next.position.x + i ].player ) {
                            if (fields[next.position.x + i ].player !== uid) {
                                return true
                            }
                            console.log('collision')
                            return false
                        }
                        if (next.color !== selected.color) {
                            return false
                        }

                    }
                }
                else {
                    console.log('bishop down')



                
                    if (diff % 9 === 0 && i % 9 == 0) {

                        if (fields[next.position.x - i].player ) {
                            if (fields[next.position.x - i ].player !== uid) {
                                return true
                            }
                            console.log('collision')
                            return false
                        }

                        if (next.color !== selected.color) {
                            return false
                        }
                    }
                    if (diff % 7 === 0 && i % 7 == 0) {

                        if (fields[next.position.x - i].player ) {
                            if (fields[next.position.x - i ].player !== uid) {
                                return true
                            }
                            console.log('collision')
                            return false
                        }

                        if (next.color !== selected.color) {
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
                        if (next.color !== selected.color) {
                            return false
                        }
    
                    }
                    if (diff % 7 === 0 && i % 7 === 0) {
    
                        if (fields[next.position.x + i].player && i > 0) {
                            console.log('collision')
                            return false
                        }
                        
                        if (next.color !== selected.color && selected.position.y !== next.position.y) {
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
                        if (next.color !== selected.color) {
                            return false
                        }
    
                    }
                    if (diff % 7 === 0 && i % 7 === 0) {
    
                        if (fields[next.position.x - i].player && i > 0) {
                            console.log('collision')
                            return false
                        }

                        if (next.color !== selected.color && selected.position.y !== next.position.y) {
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
                        
                        if (fields[next.position.x + i ].player  ) {
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

            if (borders.indexOf(selected.position.x) >= 0 && borders.indexOf(next.position.x) >= 0) {
                
                if (diff === 8) {
                    return { success: true }
                }
                throw new Error()

            }

            
        }

        if (fields[next.position.x].player) {

            if (fields[next.position.x].player !== uid) {
                return true
            } else {
                console.log('collision')
                return false
            }
        }

        return true;

    } catch (err) {
        
        return false
    }

}