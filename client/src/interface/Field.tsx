import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { isCorrectMove, setMove, setPromotion } from '../store/actions/board/piece';
import { checkMovement } from '../store/actions/soldiers';
import Bishop from './soldiers/Bishop';
import Knight from './soldiers/Knight';
import King from './soldiers/King';
import Pawn from './soldiers/Pawn';
import Queen from './soldiers/Queen';
import Rook from './soldiers/Rook';

import { isPotentialMove } from '../utils/isPotentialMove'




const Field = ({ index, selectedData, setSelectedData, moved, setMoved, field, board, setMove, auth, socket, dangerous, setDangerous, setPromotion }: any) => {


    const handleClick = (field: any) => {

        if ( board.game.turn == 0 ) {
            if (board.game.players[0]._id !== auth.user._id) {
                return false
            }
        }
        if ( board.game.turn == 1 ) {
            if (board.game.players[1]._id !== auth.user._id) {
                return false
            }
        }

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
            
            const value = isPotentialMove(selectedData, field, auth.user._id, board.game.players, board.game.board, setOpponentField)
            
            console.log(value.enemy)
            
            if (field.position.x === value.enemy) {
                
                
                return {
                    backgroundColor: 'red' 
                }
            }
            
            if (value.success) {
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
                
                {
                    (position.y === 0 || position.y === 7) && type === 'Pawn' && player === auth.user._id && <Fragment>
                        <div className="promotion" style={position.y === 0 ? { top: '100%' } : { bottom: '100%'}}>
                            <button onClick={e=> setPromotion(position, "Queen", board.game._id, socket)}><Queen game={board.game} field={field} /></button>
                            <button onClick={e=> setPromotion(position, "Bishop", board.game._id, socket)}><Bishop game={board.game} field={field} /></button>
                            <button onClick={e=> setPromotion(position, "Knight", board.game._id, socket)}><Knight game={board.game} field={field} /></button>
                            <button onClick={e=> setPromotion(position, "Rook", board.game._id, socket)}><Rook game={board.game} field={field} /></button>
                        </div>
                        <div className="promo-shadow"></div>
                        </Fragment>
                }

                { type === 'Pawn' && <Pawn game={board.game} field={field} /> }
                { type === 'Rook' && <Rook game={board.game} field={field} /> }
                { type === 'Knight' && <Knight game={board.game} field={field} /> }
                { type === 'Bishop' && <Bishop game={board.game} field={field} /> }
                { type === 'Queen' && <Queen game={board.game} field={field} /> }
                { type === 'King' && <King game={board.game} field={field} /> }

            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    board: state.board,
    auth: state.auth
})
export default connect(mapStateToProps, { setMove, setPromotion })(Field);