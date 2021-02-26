import React, { Fragment, useEffect } from 'react';




const Pawn = ({ game, field }: any) => {

    

    return (
        <Fragment>
            
            {
                field.player === game.players[0] ? <i className="fas fa-chess-pawn" style={{ color: 'lightblue' }}></i> : <i className="fas fa-chess-pawn" style={{ color: 'darkblue' }}></i>
            }
            
            
        </Fragment>
    );
}
export default Pawn;