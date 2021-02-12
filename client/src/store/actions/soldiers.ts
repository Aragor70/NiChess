

export const getInitialPosition = () => {

    const fields = new Array(64).fill(0)

    // player 2 (black)
    
    for (let i = 8; i <= 15; i++) {
        fields[i] = {
            player: 2,
            type: 'Pawn'
        }
    }
    fields[0] = {
        player: 2,
        type: 'Rook'
    }
    fields[7] = {
        player: 2,
        type: 'Rook'
    }
    fields[1] = {
        player: 2,
        type: 'Jumper'
    }
    fields[6] = {
        player: 2,
        type: 'Jumper'
    }
    fields[2] = {
        player: 2,
        type: 'Bishop'
    }
    fields[5] = {
        player: 2,
        type: 'Bishop'
    }
    fields[3] = {
        player: 2,
        type: 'Queen'
    }
    fields[4] = {
        player: 2,
        type: 'King'
    }

    // player 1 (white)

    for (let i = 48; i <= 55; i++) {
        fields[i] = {
            player: 1,
            type: 'Pawn'
        }
    }

    fields[56] = {
        player: 1,
        type: 'Rook'
    }
    fields[63] = {
        player: 1,
        type: 'Rook'
    }
    fields[57] = {
        player: 1,
        type: 'Jumper'
    }
    fields[62] = {
        player: 1,
        type: 'Jumper'
    }
    fields[58] = {
        player: 1,
        type: 'Bishop'
    }
    fields[61] = {
        player: 1,
        type: 'Bishop'
    }
    fields[59] = {
        player: 1,
        type: 'Queen'
    }
    fields[60] = {
        player: 1,
        type: 'King'
    }

    return fields;
}


export const checkMovement = (selected: any, next: any) => {

    try {
        const { position, figure: { type, player } } = selected
        
        if (player === 1) {

            if ( type === 'Pawn' ) {

                const diff = position.x - next.x

                if (position.y === 6 && diff === 16) {
                    return true
                }

                if ( diff !== 8) {
                    throw new Error()
                }
                
            }
            if ( type === 'Rook' ) {

                const diff = Math.abs(position.x - next.x)

                if (position.x !== next.x) {
                    if (diff % 8 !== 0) {
                        throw new Error()
                    }
                }

                
            }

            if ( type === 'Jumper' ) {

                const diff = Math.abs(position.x - next.x)

                
                if (diff !== 17 && diff !== 10 && diff !== 15 && diff !== 6) {
                    throw new Error()
                }

                
            }

            if ( type === 'Bishop' ) {

                const diff = Math.abs(position.x - next.x)

                
                if (diff % 9 !== 0 && diff % 7 !== 0) {
                    throw new Error()
                }

                
            }

            if ( type === 'Queen' ) {

                const diff = Math.abs(position.x - next.x)

                
                
                if (diff % 9 !== 0 && diff % 7 !== 0 && position.y !== next.y && diff % 8 !== 0) {
                    throw new Error()
                }

                
            }

            if ( type === 'King' ) {

                const diff = Math.abs(position.x - next.x)

                
                
                if (diff !== 1 && diff !== 8 && diff !== 7 && diff !== 9) {
                    throw new Error()
                }

                
            }


        }
        if (player === 2) {




        }

        return true

    } catch (err) {
        return false
    }

}