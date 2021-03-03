import React, { Fragment } from 'react';


import jumper1 from "../../style/icons/pieces/jumper1.png"
import jumper2 from "../../style/icons/pieces/jumper2.png"

const Knight = ({ game, field }: any) => {




    return (   
        <Fragment>

            {
                field.player === game.players[0]._id ? <img src={jumper1} /> : <img src={jumper2} />
            }
            
        </Fragment>
    );
}
export default Knight;