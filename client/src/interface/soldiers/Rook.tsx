import React, { Fragment, useEffect } from 'react';




const Rook = ({ game, field }: any) => {



    return (
        <Fragment>

            {
                field.player === game.players[0] ? <i className="fas fa-chess-rook" style={{ color: 'lightblue' }}></i> : <i className="fas fa-chess-rook" style={{ color: 'darkblue' }}></i>
            }
            
        </Fragment>
    );
}
export default Rook;