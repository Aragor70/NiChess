export const isPotentialMove = ( selectedData: any, field: any, uid: string, players: any[], fields: any[], setOpponentField: any ) => {

    const { position, type, player } = selectedData;
    
    if (field.player == uid) {
        return false
    }

    if (player == players[0]) {
        
        if ( type === 'Pawn' ) {

            const diff = position.x - field.position.x

            if (position.y === 6 && diff === 16) {

                if (fields[position.x - 8].player) {

                        console.log('collision')
                        return false
                    }

                if (field.position.x - position.x === -8 || field.position.x - position.x === -16) {

                    
                    console.log('x')
                    return true
                }

            }

            if (field.position.x - position.x === -8) {

                if (field.player) {
                    return false
                }
                
                console.log('x')
                return true
            }
            if (diff === 9 && fields[position.x - 9].player) {
                if (fields[position.x - 9].player !== uid) {
                    return true
                }
            }
            if (diff === 7 && fields[position.x - 7].player) {
                if (fields[position.x - 7].player !== uid) {
                    return true
                }
            }
            
            return false
        }
    }

    if (player == players[1]) {

        if ( type === 'Pawn' ) {

            const diff = position.x - field.position.x

            if (position.y === 1 && diff === -16) {

                if (fields[position.x + 8].player) {

                        console.log('collision')
                        
                        return false
                    }

                if (field.position.x - position.x === 8 || field.position.x - position.x === 16) {

                    
                    console.log('x')
                    return true
                }

            }
            if (diff === -9 && fields[position.x + 9].player) {
                if (fields[position.x + 9].player !== uid) {
                    return true
                }
            }
            if (diff === -7 && fields[position.x + 7].player) {
                if (fields[position.x + 7].player !== uid) {
                    return true
                }
            }
            if (field.position.x - position.x === 8) {

                if (field.player) {
                        return false
                    }
                console.log('x')
                return true
            }
            return false
        }
    }


    if ( type === 'Rook' ) {

        const diff = Math.abs(field.position.x - position.x)
        for (let i = 0; i < diff; i++) {
            if (i % 8 == 0 ) {

                if (position.x > field.position.x) {
                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        return false
                    }
                    
                }

                if (position.x < field.position.x) {
                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        return false
                    }
                    
                }

                
                
            }
            if (position.y === field.position.y) {
                
                if (position.x > field.position.x) {
                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        return false
                    }

                } else {
                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        return false
                    }
                }
                        
            }
        }

        
        if (diff % 8 === 0 ) {
            return true
        }
        if (field.position.y === position.y) {
            return true
        }
        
            
    }



    if ( type === 'Jumper' ) {

        const diff = Math.abs(field.position.x - position.x)

        
        if (diff == 17 || diff == 10 || diff == 15 || diff == 6) {
            return true
        }
        
        
    }


    if ( type === 'Bishop' ) {

        const diff = Math.abs(field.position.x - position.x)
        
        for (let i = 0; i < diff; i++) {

            if (diff % 9 === 0 && i % 9 === 0) {
                
                if (position.x > field.position.x) {
                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        console.log('hi')
                        return false
                    }
                }
                if (position.x < field.position.x) {
                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        console.log('hi')
                        return false
                    }
                }
                
                
            }
            if (diff % 7 === 0 && i % 7 === 0) {
                
                if (position.x > field.position.x) {
                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        return false
                    }

                }
                if (position.x < field.position.x) {
                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        return false
                    }
                }
                
                    
            }

            if (field.color !== selectedData.color) {
                return false
            }

            if ((diff % 9 === 0 || diff % 7 === 0)) {

                
                return true
            }

        }
        
        
        
        
    }

    if ( type === 'Queen' ) {

        const diff = Math.abs(field.position.x - position.x)
        
        for (let i = 0; i < diff; i++) {
            if (position.x > field.position.x) {
                if (diff % 9 === 0 && i % 9 == 0) {

                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        return false
                    }
                    if (field.color !== selectedData.color) {
                        return false
                    }

                }
                if (diff % 7 === 0 && i % 7 === 0) {

                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        return false
                    }
                    
                    if (field.color !== selectedData.color && field.position.y !== position.y) {
                        return false
                    }

                }
                if (diff % 8 === 0 && i % 8 === 0) {

                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        return false
                    }

                }


            }


            if (position.x < field.position.x) {
                if (diff % 9 === 0 && i % 9 == 0) {
                    
                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        return false
                    }
                    if (field.color !== selectedData.color) {
                        return false
                    }

                }
                if (diff % 7 === 0 && i % 7 === 0) {

                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        return false
                    }
                    
                    if (field.color !== selectedData.color && field.position.y !== position.y) {
                        return false
                    }

                }
                if (diff % 8 === 0 && i % 8 === 0) {

                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        return false
                    }

                }
            }

            if (field.position.y == position.y) {

                if (position.x > field.position.x) {
                    if (fields[field.position.x + i].player) {
                        console.log('collision')
                        return false
                    }

                } else {
                    if (fields[field.position.x - i].player) {
                        console.log('collision')
                        return false
                    }
                }

            }
        }
        
        if (diff % 9 == 0 || diff % 7 == 0 || field.position.y == position.y || diff % 8 == 0) {

            return true
        }


    }


    if ( type === 'King' ) {

        const diff = Math.abs(field.position.x - position.x)

        if (diff == 1 || diff == 8 || diff == 7 || diff == 9) {
            return true
        }

        
    }



    
    return false

}
