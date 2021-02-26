import React, { Fragment } from 'react';



import queen1 from "../../style/icons/pieces/queen1.png"
import queen2 from "../../style/icons/pieces/queen2.png"

const Queen = ({ game, field }: any) => {




    return (   
        <Fragment>

            {
                field.player === game.players[0] ? <img src={queen1} /> : <img src={queen2} />
            }
            
        </Fragment>
    );
}
export default Queen;