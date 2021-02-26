import React, { Fragment } from 'react';




const Queen = ({ game, field }: any) => {




    return (   
        <Fragment>

            {
                field.player === game.players[0] ? <i className="fas fa-chess-queen" style={{ color: 'lightblue' }}></i> : <i className="fas fa-chess-queen" style={{ color: 'darkblue' }}></i>
            }
            
        </Fragment>
    );
}
export default Queen;