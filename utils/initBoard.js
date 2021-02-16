

const initBoard = () =>{

    let fields = new Array(64).fill(0)


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

    for (let i = 0; i < fields.length; i++) {

        let y = Math.floor((i * 8) / 64)

        fields[i] = {...fields[i], position: {
            y,
            x: i
        }, color: y % 2 === 0 ? i % 2 === 0 ? '#fff' : 'lightgrey' : i % 2 !== 0 ? '#fff' : 'lightgrey'}

    }

    return fields

}

module.exports = initBoard