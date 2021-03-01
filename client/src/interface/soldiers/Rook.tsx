import React, { Fragment, useEffect } from 'react';



import rook1 from "../../style/icons/pieces/rook1.png"
import rook2 from "../../style/icons/pieces/rook2.png"

const Rook = ({ game, field }: any) => {



    return (
        <Fragment>

            {
                field.player === game.players[0]._id ? <img src={rook1} /> : <img src={rook2} />
            }
            
        </Fragment>
    );
}
export default Rook;