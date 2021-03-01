import React, { Fragment } from 'react';

import king1 from "../../style/icons/pieces/king1.png"
import king2 from "../../style/icons/pieces/king2.png"


const King = ({ game, field }: any) => {




    return (   
        <Fragment>

            {
                field.player === game.players[0]._id ? <img src={king1} /> : <img src={king2} />
            }
            
        </Fragment>
    );
}
export default King;