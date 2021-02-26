import React, { Fragment } from 'react';




const Bishop = ({ game, field }: any) => {




    return (   
        <Fragment>

            {
                field.player === game.players[0] ? <i className="fas fa-chess-bishop" style={{ color: 'lightblue' }}></i> : <i className="fas fa-chess-bishop" style={{ color: 'darkblue' }}></i>
            }
            
        </Fragment>
    );
}
export default Bishop;