import React, { Fragment, useEffect } from 'react';




const Pawn = ({ position: { y, x }, player, selectedData, setSelectedData, moved, figure, setFigure, setMoved }: any) => {

    useEffect(() => {
        
        if (moved && selectedData.position.x === x) {
            
            console.log('moved')

            setFigure({...figure, player: 0, type: ''})
            setMoved(false)

            setSelectedData({
                position: {
                    y: null,
                    x: null
                }, figure: {
                    player: 0,
                    type: ''
                }
            })
        }
    }, [moved])

    // y - 1 || y - 2

    return (   
        <Fragment>

            Pawn
            
        </Fragment>
    );
}
export default Pawn;