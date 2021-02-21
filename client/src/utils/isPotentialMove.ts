export const isPotentialMove = ( selectedData: any, field: any, uid: string, players: any[] ) => {

    const { position, type, player } = selectedData;
    
    if (field.player) {
        return false
    }

    if (player == players[0]) {
        
        if ( type === 'Pawn' ) {

            
            if (position.y === 6) {

                
                if (field.position.x - position.x === -8 || field.position.x - position.x === -16) {

                    console.log('x')
                    return true
                }

            }

            if (field.position.x - position.x === -8) {

                console.log('x')
                return true
            }
            return false
        }
    }

    if (player == players[1]) {

        if ( type === 'Pawn' ) {


            if (position.y === 1) {


                if (field.position.x - position.x === 8 || field.position.x - position.x === 16) {

                    console.log('x')
                    return true
                }

            }

            if (field.position.x - position.x === 8) {

                console.log('x')
                return true
            }
            return false
        }
    }


    if ( type === 'Rook' ) {

        const diff = Math.abs(field.position.x - position.x)
        
        if (diff % 8 == 0) {
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

        
        if (diff % 9 == 0 || diff % 7 == 0) {
            return true
        }

        
    }


    if ( type === 'Queen' ) {

        const diff = Math.abs(field.position.x - position.x)
        
        
        
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
