import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { isCorrectMove, setMove } from '../store/actions/board/piece';
import { checkMovement } from '../store/actions/soldiers';
import Bishop from './soldiers/Bishop';
import Jumper from './soldiers/Jumper';
import King from './soldiers/King';
import Pawn from './soldiers/Pawn';
import Queen from './soldiers/Queen';
import Rook from './soldiers/Rook';




const Field = ({ index, selectedData, setSelectedData, moved, setMoved, field, board, setMove, auth }: any) => {


    const handleClick = (field: any) => {

        

        if (selectedData !== null && field.player !== auth.user._id) {
            

            setMove(selectedData, field, board.game._id)
            return setSelectedData(null)
        }

        if (field.player === auth.user._id) {
            
            if (selectedData !== null) {
                
                if (selectedData.position.x === field.position.x) {
                    return setSelectedData(null)
                }


                if (selectedData.player !== auth.user._id) {
                    setSelectedData(null)
                    return setMove(selectedData, field, board.game._id)
                }


                if (field.player === auth.user._id) {
                    setSelectedData(null)
                    return console.log('friendly', 'unselect')
                }
                
                

                // set move
                setMove(selectedData, field, board.game._id)
                
            } else {

                setSelectedData(field)
            
            }

            
        }

        if (field.player !== auth.user._id) {

            if (selectedData !== null) {
                
                
                setSelectedData(null)
                
            }
            
            console.log('You cannot select this')

        }

        
    }
    
    const { position, color, player, type } = field

    

    return (
        <Fragment>
            <div className="field-content" onClick={e => handleClick(field) } style={ selectedData && position.x == selectedData.position.x ? { backgroundColor: 'green' } : { backgroundColor: color }}>
                
                <span>{position.y} / {position.x}</span>

                { type === 'Pawn' && <Pawn position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Rook' && <Rook position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Jumper' && <Jumper position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Bishop' && <Bishop position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Queen' && <Queen position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'King' && <King position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }

            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    board: state.board,
    auth: state.auth
})
export default connect(mapStateToProps, { setMove })(Field);