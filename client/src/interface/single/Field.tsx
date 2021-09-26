import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setMove, setPromotion } from '../../store/actions/board/piece';
import { checkMovement } from '../../store/actions/soldiers';
import Bishop from '../soldiers/Bishop';
import Knight from '../soldiers/Knight';
import King from '../soldiers/King';
import Pawn from '../soldiers/Pawn';
import Queen from '../soldiers/Queen';
import Rook from '../soldiers/Rook';

import { isPotentialMove } from '../../utils/isPotentialMove'
import { addMove } from '../../store/actions/single/piece';
import { isCorrectMove } from '../../utils/isCorrectMove';




const Field = ({ index, selectedData, setSelectedData, field, board, addMove, auth, socket, dangerous, setDangerous, setPromotion, isBlackCheck, isWhiteCheck, possibleWhiteMoves, setPossibleWhiteMoves, possibleWBlackMoves, setPossibleBlackMoves, countPossibleMovements, game }: any) => {

    const handleClick = async(field: any) => {
        let opponent: number = 1
        if ( board.game.turn == 0 ) {
            if (board.game.players[0]._id !== auth.user._id) {
                return false
            } else {
                opponent = 1
            }
        }
        if ( board.game.turn == 1 ) {
            if (board.game.players[1]._id !== auth.user._id) {
                return false
            } else {
                opponent = 0
            }
        }

        if (selectedData !== null && field.player !== auth.user._id) {
            
            const isMatch = await isCorrectMove(selectedData, field, board.game.board, auth.user._id, 1, isBlackCheck || isWhiteCheck || false, possibleWBlackMoves, possibleWhiteMoves, countPossibleMovements, board.game.players, board.game.turn)

            if (!isMatch) {
                return false
            }
            

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

            addMove(opponent, selectedData, field)
            return setSelectedData(null)
        }

        if (field.player === auth.user._id) {
            
            if (selectedData !== null) {
                
                if (selectedData.position.x === field.position.x) {
                    return setSelectedData(null)
                }


                if (selectedData.player !== auth.user._id) {
                    setSelectedData(null)
                    const isMatch = await isCorrectMove(selectedData, field, game.board, auth.user._id, 1, isBlackCheck || isWhiteCheck || false, possibleWBlackMoves, possibleWhiteMoves, countPossibleMovements, board.game.players, board.game.turn)

                    if (!isMatch) {
                        return false
                    }
                    
                }


                if (field.player === auth.user._id) {
                    setSelectedData(null)
                    return console.log('friendly', 'unselect')
                }
                
                // set move

                await countPossibleMovements(game)
                const isCorrect: boolean = await !!isCorrectMove(selectedData, field, board.game.board, 'b', 2, isBlackCheck || isWhiteCheck || false, possibleWBlackMoves, possibleWhiteMoves, countPossibleMovements, board.game.players, board.game.turn)
                if (!isCorrect) {
                    console.log('move')
                    return false
                }

                const isMatch = await isCorrectMove(selectedData, field, board.game.board, auth.user._id, 1, isBlackCheck || isWhiteCheck || false, possibleWBlackMoves, possibleWhiteMoves, countPossibleMovements, board.game.players, board.game.turn)
                
                if (!isMatch) {
                    return false
                }
                addMove(opponent, selectedData, field)
                
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
            
            const value = isPotentialMove(selectedData, field, auth.user._id, board.game.players, board.game.board)
            
            
            if (field.position.x === value.enemy) {
                
                
                return {
                    backgroundColor: 'red' 
                }
            }
            
            if (value.success) {
                return {
                    borderRadius: '50%',
                    border: '1.5px solid blue'
                }
            }
            
            
            return { backgroundColor: color }
            

        } else {

            if (player && player !== auth.user._id) {
                
                return {
                    backgroundColor: color,
                    cursor: 'not-allowed'
                }
            
            
            } else {
                return { backgroundColor: color }
            }
            
            
        }
    }
    
    const handleDrag = (e: any) => {
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
        setSelectedData(field)
    }

    const handleDragEnd = (e: any) => {
        setSelectedData(null)
    }


    return (
        <Fragment>
            <div className="field-content" onClick={e => handleClick(field) } style={ styleUpdate(selectedData) } onDragStartCapture={ e=> handleDrag(e)} onDragEndCapture={e=> handleDragEnd(e)} onDragOver={e=> e.preventDefault()} onDrop={e=> handleClick(field)}>

                {
                    (position.y === 0 || position.y === 7) && type === 'Pawn' && player === auth.user._id && <Fragment>
                        <div className="promotion" style={position.y === 0 ? { top: '100%' } : { bottom: '100%'}}>
                            <button onClick={e=> setPromotion(position, "Queen", board.game._id, socket, true, board.game)}><Queen game={board.game} field={field} /></button>
                            <button onClick={e=> setPromotion(position, "Bishop", board.game._id, socket, true, board.game)}><Bishop game={board.game} field={field} /></button>
                            <button onClick={e=> setPromotion(position, "Knight", board.game._id, socket, true, board.game)}><Knight game={board.game} field={field} /></button>
                            <button onClick={e=> setPromotion(position, "Rook", board.game._id, socket, true, board.game)}><Rook game={board.game} field={field} /></button>
                        </div>
                        <div className="promo-shadow" onClick={e=> setSelectedData(null)}></div>
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
export default connect(mapStateToProps, { addMove, setPromotion })(Field);