const isCorrectMove = (selected, next, fields, user, player) => {

    const uid = user._id
    try {

        if (player == 1) {

            if ( selected.type === 'Pawn' ) {

                const diff = selected.position.x - next.position.x
                console.log(diff)

                if (selected.position.y === 6 && diff === 16) {


                    if (fields[selected.position.x - 8].player) {

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


                    return true
                }

                if (diff === -9 && fields[selected.position.x + 9].player) {
                    if (fields[selected.position.x + 9].player !== uid) {
                        return true
                    }
                }
                if (diff === -7 && fields[selected.position.x + 7].player !== uid) {
                    if (fields[selected.position.x + 7].player !== uid) {
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
module.exports = isCorrectMove;