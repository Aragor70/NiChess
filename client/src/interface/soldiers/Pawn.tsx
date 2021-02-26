import React, { Fragment, useEffect } from 'react';

import pawn1 from "../../style/icons/pieces/pawn1.png"
import pawn2 from "../../style/icons/pieces/pawn2.png"


const Pawn = ({ game, field }: any) => {

    

    return (
        <Fragment>
            
            {
                field.player === game.players[0] ? <img src={pawn1} /> : <img src={pawn2} />
            }
            
            
        </Fragment>
    );
}
export default Pawn;