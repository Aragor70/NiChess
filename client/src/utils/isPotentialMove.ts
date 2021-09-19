export const isPotentialMove = ( selectedData: any, field: any, uid: string, players: any[], fields: any[], attackOnly: boolean = false) => {

    const { position, type, player } = selectedData;
    
    const borders = [0, 7, 8, 16, 24, 32, 40, 48, 56, 15, 23, 31, 39, 47, 55, 63, 56, 57]

    if (field.player == uid) {
        return { success: false }
    }

    if (player == players[0]._id) {
        
        if ( type === 'Pawn' ) {

            const diff = position.x - field.position.x

            if (!attackOnly) {

                if (position.y === 6 && diff === 16) {

                    if (fields[position.x - 8].player) {
    
                        console.log('collision')
                        return { success: false, enemy: field.position.x - 8 }
                    }
                    if (fields[position.x - 16].player) {
    
                        console.log('collision')
                        return { success: false, enemy: field.position.x - 8 }
                    }
    
                    if (field.position.x - position.x === -8 || field.position.x - position.x === -16) {
    
                        
                        console.log('x')
                        return { success: true }
                    }
    
                }
    
                if (field.position.x - position.x === -8) {
    
                    if (field.player) {
                        return { success: false }
                    }
                    
                    console.log('x')
                    return { success: true }
                }

            }
            if (attackOnly) {
                if (diff === 9) {
                    
                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }

                    return { success: true, enemy: position.x - 9 }
                    
                }
                if (diff === 7) {
                    
                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }
                    return { success: true, enemy: position.x - 7 }
                    
                }
            }
            if (diff === 9 && fields[position.x - 9].player) {
                if (fields[position.x - 9].player !== uid) {
                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }
                    return { success: true, enemy: position.x - 9 }
                }
            }
            if (diff === 7 && fields[position.x - 7].player) {
                if (fields[position.x - 7].player !== uid) {

                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }

                    return { success: true, enemy: position.x - 7 }
                }
            }
            
            return { success: false }
        }
    }

    if (player == players[1]._id) {

        if ( type === 'Pawn' ) {

            const diff = position.x - field.position.x

            if (!attackOnly) {
                if (position.y === 1 && diff === -16) {
    
                    if (fields[position.x + 8].player) {
    
                        console.log('collision')
                        
                        return { success: false, enemy: field.position.x + 8 }
                    }
                    if (fields[position.x + 16].player) {
    
                        console.log('collision')
                        
                        return { success: false, enemy: field.position.x + 8 }
                    }
    
                    if (field.position.x - position.x === 8 || field.position.x - position.x === 16) {
    
                        
                        console.log('x')
                        return { success: true }
                    }
    
                }
                
                if (field.position.x - position.x === 8) {

                    if (field.player) {
                            return { success: false }
                        }
                    console.log('x')
                    return { success: true }
                }
            }
            if (attackOnly) {
                if (diff === -9) {
                    
                    
                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }
                    return { success: true, enemy: position.x + 9 }
                    
                }
                if (diff === -7) {
                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }
                    return { success: true, enemy: position.x + 7 }
                    
                }
            }
            if (diff === -9 && fields[position.x + 9].player) {
                if (fields[position.x + 9].player !== uid) {

                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }
                    return { success: true, enemy: position.x + 9 }
                }
            }
            if (diff === -7 && fields[position.x + 7].player) {
                if (fields[position.x + 7].player !== uid) {
                    if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                        
                        
                        return { success: false }

                    }
                    return { success: true, enemy: position.x + 7 }
                }
            }
            
            return { success: false }
        }
    }

    

    if ( type === 'Rook' ) {

        const diff = Math.abs(field.position.x - position.x)
        for (let i = 0; i < diff; i++) {
            if (i % 8 == 0 ) {

                if (position.x > field.position.x) {
                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', field.position.x - i)
                        return { success: false, enemy: position.x - i }
                    }
                    
                }

                if (position.x < field.position.x) {
                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', field.position.x + i)
                        return { success: false, enemy: position.x + i }
                    }
                    
                }

                
                
            }

            
            if (field.position.y == position.y) {

                if (position.x > field.position.x) {
                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        return { success: false }
                    }

                } else {
                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        return { success: false }
                    }
                }

            }
        }

        
        if (diff % 8 === 0 ) {
            return { success: true }
        }
        if (field.position.y === position.y) {
            return { success: true }
        }
        
            
    }



    if ( type === 'Knight' ) {

        const diff = Math.abs(field.position.x - position.x)

        
        
        
        if (diff == 17 || diff == 10 || diff == 15 || diff == 6) {
            

            if (diff == 17 && field.position.y === position.y - 2) {
                
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }

                return { success: true }
            }
            if (diff == 10 && field.position.y === position.y - 1) {
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }
                return { success: true }
            }
            if (diff == 15 && field.position.y === position.y - 2) {
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }
                return { success: true }
            }
            if (diff == 6 && field.position.y === position.y - 1) {
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }
                return { success: true }
            }
            
            if (diff == 17 && field.position.y === position.y + 2) {
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }
                return { success: true }
            }
            if (diff == 10 && field.position.y === position.y + 1) {
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }
                return { success: true }
            }
            if (diff == 15 && field.position.y === position.y + 2) {
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }
                return { success: true }
            }
            if (diff == 6 && field.position.y === position.y + 1) {
                if (fields[field.position.x].player) {
                    if (fields[field.position.x].player !== uid) {
                        return { success: true, enemy: field.position.x }
                    }
                }
                return { success: true }
            }

        }
        
        
    }


    if ( type === 'Bishop' ) {

        const diff = Math.abs(field.position.x - position.x)
        
        for (let i = 0; i < diff; i++) {

            if (position.x > field.position.x) {
                if (diff % 9 === 0 && i % 9 == 0) {

                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', field.position.x - i)
                        if (field.color !== selectedData.color) {
                            return { success: false }
                        }
                        
                        return { success: false, enemy: position.x - i }
                    }
                    if (field.color !== selectedData.color) {
                        return { success: false }
                    }

                }
                if (diff % 7 === 0 && i % 7 === 0) {

                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', field.position.x - i)
                        return { success: false, enemy: position.x - i }
                    }
                    
                    if (field.color !== selectedData.color && field.position.y !== position.y) {
                        return { success: false }
                    }
                    

                }
            }

            if (position.x < field.position.x) {
                if (diff % 9 === 0 && i % 9 == 0) {
                    
                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        if (field.color !== selectedData.color) {
                            return { success: false }
                        }
                        
                        console.log('enemy', position.x + i)
                        return { success: false, enemy: position.x + i }
                    }
                    

                }
                if (diff % 7 === 0 && i % 7 === 0) {

                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        if (field.color !== selectedData.color) {
                            return { success: false }
                        }

                        return { success: false, enemy: position.x + i }
                    }
                    
                    if (field.color !== selectedData.color && field.position.y !== position.y) {
                        return { success: false }
                    }

                }
            }

            if (field.color !== selectedData.color) {
                return { success: false }
            }

            

        }
        
        if (diff % 9 === 0 || diff % 7 === 0) {

                
            return { success: true }
        }
        
        
    }

    if ( type === 'Queen' ) {

        const diff = Math.abs(field.position.x - position.x)
        
        for (let i = 0; i < diff; i++) {

            if (position.x > field.position.x) {
                if (diff % 9 === 0 && i % 9 == 0) {

                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', position.x - i)
                        if (field.color !== selectedData.color) {
                            return { success: false }
                        }
                        
                        
                        return { success: false, enemy: position.x - i }
                    }
                    if (field.color !== selectedData.color) {
                        return { success: false }
                    }

                }
                
                if (diff % 7 === 0 && i % 7 === 0) {

                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', field.position.x - i)
                        return { success: false, enemy: position.x - i }
                    }
                    
                    if (field.color !== selectedData.color && field.position.y !== position.y) {
                        return { success: false }
                    }
                    

                }
                if (diff % 8 === 0 && i % 8 === 0) {

                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', field.position.x - i)

                        
                        return { success: false, enemy: position.x - i }
                    }
                    

                }


            }


            if (position.x < field.position.x) {
                if (diff % 9 === 0 && i % 9 === 0) {
                    
                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        if (field.color !== selectedData.color) {
                            return { success: false }
                        }
                        
                        
                        console.log('enemy', position.x + i)
                        return { success: false, enemy: position.x + i }
                    }
                    if (field.color !== selectedData.color) {
                        return { success: false }
                    }
                    
                    
                }
                if (diff % 7 === 0 && i % 7 === 0) {

                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        if (field.color !== selectedData.color) {
                            return { success: false }
                        }
                        

                        return { success: false, enemy: position.x + i }
                    }
                    
                    if (field.color !== selectedData.color && field.position.y !== position.y) {
                        return { success: false }
                    }

                }
                if (diff % 8 === 0 && i % 8 === 0) {

                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        console.log('enemy', position.x + i)
                        

                        return { success: false, enemy: position.x + i }
                    }


                }
            }

            if (field.position.y == position.y) {

                if (position.x > field.position.x) {
                    if (fields[position.x - i].player && i >= 1) {
                        console.log('collision')
                        return { success: false }
                    }

                } else {
                    if (fields[position.x + i].player && i >= 1) {
                        console.log('collision')
                        return { success: false }
                    }
                }

            }
        }
        
        if (diff % 9 == 0 || diff % 7 == 0 || field.position.y == position.y || diff % 8 == 0) {

            return { success: true }
        }
        if (diff % 9 !== 0 && diff % 7 !== 0 && position.y !== field.position.y && diff % 8 !== 0) {
            return { success: false }
        }


    }


    if ( type === 'King' ) {

        const diff = Math.abs(field.position.x - position.x)

        if (diff == 1 || diff == 8 || diff == 7 || diff == 9) {

            if (borders.indexOf(position.x) >= 0 && borders.indexOf(field.position.x) >= 0) {
                
                if (diff === 8) {
                    return { success: true }
                }
                return { success: false }

            }

            return { success: true }
        }

        
    }



    
    return { success: false }

}
