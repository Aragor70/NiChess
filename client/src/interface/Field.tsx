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

import { isPotentialMove } from '../utils/isPotentialMove'




const Field = ({ index, selectedData, setSelectedData, moved, setMoved, field, board, setMove, auth, socket }: any) => {


    const handleClick = (field: any) => {

        

        if (selectedData !== null && field.player !== auth.user._id) {
            

            setMove(selectedData, field, board.game._id, socket)
            return setSelectedData(null)
        }

        if (field.player === auth.user._id) {
            
            if (selectedData !== null) {
                
                if (selectedData.position.x === field.position.x) {
                    return setSelectedData(null)
                }


                if (selectedData.player !== auth.user._id) {
                    setSelectedData(null)
                    return setMove(selectedData, field, board.game._id, socket)
                }


                if (field.player === auth.user._id) {
                    setSelectedData(null)
                    return console.log('friendly', 'unselect')
                }
                
                

                // set move
                setMove(selectedData, field, board.game._id, socket)
                
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
    const [opponentField, setOpponentField] = useState(false)
    
    const { position, color, player, type } = field


    const styleUpdate = (selected: any) => {

        if (selected) {
            if (position.x == selectedData.position.x) {
                
                
                return { backgroundColor: 'green' }
                
            }
            
            if (isPotentialMove(selectedData, field, auth.user._id, board.game.players, board.game.board, setOpponentField)) {
                return {
                    backgroundColor: 'blue' 
                }
            }
            
            return { backgroundColor: color }
            

        } else {
            return { backgroundColor: color }
        }
    }

    return (
        <Fragment>
            <div className="field-content" onClick={e => handleClick(field) } style={ styleUpdate(selectedData) }>
                
                <span>{position.y} / {position.x}</span>

                { type === 'Pawn' && <Pawn  /> }
                { type === 'Rook' && <Rook  /> }
                { type === 'Jumper' && <Jumper  /> }
                { type === 'Bishop' && <Bishop  /> }
                { type === 'Queen' && <Queen  /> }
                { type === 'King' && <King  /> }

            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    board: state.board,
    auth: state.auth
})
export default connect(mapStateToProps, { setMove })(Field);