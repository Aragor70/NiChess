import React, { Fragment } from 'react';




const King = ({ game, field }: any) => {




    return (   
        <Fragment>

            {
                field.player === game.players[0] ? <i className="fas fa-chess-king" style={{ color: 'lightblue' }}></i> : <i className="fas fa-chess-king" style={{ color: 'darkblue' }}></i>
            }
            
        </Fragment>
    );
}
export default King;