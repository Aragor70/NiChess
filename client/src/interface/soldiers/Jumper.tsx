import React, { Fragment } from 'react';




const Jumper = ({ game, field }: any) => {




    return (   
        <Fragment>

            {
                field.player === game.players[0] ? <i className="fas fa-chess-knight" style={{ color: 'lightblue' }}></i> : <i className="fas fa-chess-knight" style={{ color: 'darkblue' }}></i>
            }
            
        </Fragment>
    );
}
export default Jumper;