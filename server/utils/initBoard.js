

const initBoard = (user, opponent) =>{

    const uid = user;
    const oid = opponent


    let fields = new Array(64).fill(0)


    for (let i = 8; i <= 15; i++) {
        
        fields[i] = {
            player: oid,
            type: 'Pawn'
        }
    }

    fields[0] = {
        player: oid,
        type: 'Rook'
    }
    fields[7] = {
        player: oid,
        type: 'Rook'
    }
    fields[1] = {
        player: oid,
        type: 'Knight'
    }
    fields[6] = {
        player: oid,
        type: 'Knight'
    }
    fields[2] = {
        player: oid,
        type: 'Bishop'
    }
    fields[5] = {
        player: oid,
        type: 'Bishop'
    }
    fields[3] = {
        player: oid,
        type: 'Queen'
    }
    fields[4] = {
        player: oid,
        type: 'King'
    }


    for (let i = 48; i <= 55; i++) {
        fields[i] = {
            player: uid,
            type: 'Pawn'
        }
    }

    fields[56] = {
        player: uid,
        type: 'Rook'
    }
    fields[63] = {
        player: uid,
        type: 'Rook'
    }
    fields[57] = {
        player: uid,
        type: 'Knight'
    }
    fields[62] = {
        player: uid,
        type: 'Knight'
    }
    fields[58] = {
        player: uid,
        type: 'Bishop'
    }
    fields[61] = {
        player: uid,
        type: 'Bishop'
    }
    fields[59] = {
        player: uid,
        type: 'Queen'
    }
    fields[60] = {
        player: uid,
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