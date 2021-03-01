import React, { Fragment } from 'react';


import bishop1 from "../../style/icons/pieces/bishop1.png"
import bishop2 from "../../style/icons/pieces/bishop2.png"




const Bishop = ({ game, field }: any) => {

    


    return (   
        <Fragment>

            {
                field.player === game.players[0]._id ? <img src={bishop1} /> : <img src={bishop2} />
            }
            
        </Fragment>
    );
}
export default Bishop;