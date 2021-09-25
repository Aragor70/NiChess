import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initGame } from '../../store/actions/single/board';
import { addMove } from '../../store/actions/single/piece';
import { isCorrectMove } from '../../utils/isCorrectMove';
import { isPotentialMove } from '../../utils/isPotentialMove';
import Field from './Field';



const Board = ({ board, auth, initGame, addMove }: any) => {

    useEffect(() => {
        initGame(auth.user._id, "b")

        return () => {
            initGame(auth.user._id, "b")
        }
    }, [])
    const [selectedData, setSelectedData] = useState<any>(null)

    
    const [moved, setMoved] = useState(false)
    const [dangerous, setDangerous] = useState<any[]>([])

    const letters = [ "a", "b", "c", "d", "e", "f", "g", "h" ]
    
    const [isWhiteCheck, setIsWhiteCheck] = useState(false)
    const [isBlackCheck, setIsBlackCheck] = useState(false)

    const [possibleWhiteMoves, setPossibleWhiteMoves] = useState<any[]>([])
    const [possibleWBlackMoves, setPossibleBlackMoves] = useState<any[]>([])

    const countPossibleMovements = async (game: any) => {

        if (game.board && game.players) {

            const fields = game.board;

            const oppGame = game.players.filter((element: any) => element._id !== auth.user._id)[0]

            const mePlayer = await game.board.filter((element: any) => element.player === auth.user._id)

            const opponentPlayer = await game.board.filter((element: any) => element.player === oppGame._id)

            let blackMoves: any[] = []
            let whiteMoves: any[] = []

            await game.board.forEach(async (boardElem: any) => {

                await Promise.all(opponentPlayer.map( async ( opp: any ) => {

                    const { success, enemy } = await isPotentialMove(opp, boardElem, oppGame._id, [{ _id: auth.user._id } , oppGame], game.board, true)

                    if (success) {
                        if (boardElem.type === 'King') {
                            setIsBlackCheck(true)
                        }
                        blackMoves = [...blackMoves, boardElem]
                    }

                }));
                await Promise.all(mePlayer.map( async ( me: any ) => {

                    const { success, enemy } = await isPotentialMove(me, boardElem, auth.user._id, [{ _id: auth.user._id } ,{ _id: 'b' }], game.board, true)

                    if (success) {
                        
                        if (boardElem.type === 'King') {
                            setIsWhiteCheck(true)
                        }
                        whiteMoves = [...whiteMoves, boardElem]
                    }

                }));
                console.log(possibleWBlackMoves, 'ciao moves')

                await setPossibleBlackMoves(blackMoves)
                await setPossibleWhiteMoves(whiteMoves)

            });


        }

    }

    useEffect(() => {

        const computerMove = async() => {
            if (board.game.turn === 1) {
                while (board.game.turn === 1) {
    
                    const computer: any = board.game.board.filter((field:any) => field.player === 'b');
    
                    const select: any = Math.floor(Math.random() * computer.length);
                    
                    const compSelected: any = computer[select];

                    const compNext: any = board.game.board[Math.floor(Math.random() * ( board.game.board.length - computer.length ))];
                    console.log('before move')
                    console.log(compSelected, compNext)

                    const { success, enemy } = await isPotentialMove(compSelected, compNext, 'b', [{ _id: auth.user._id }, { _id: 'b' }], board.game.board)
                    if (success){
                        await countPossibleMovements(board.game)

                        const isMatch = await isCorrectMove(compSelected, compNext, board.game.board, 'b', 2, isBlackCheck || isWhiteCheck || false, possibleWBlackMoves, possibleWhiteMoves, countPossibleMovements, board.game.players)

                        if (!isMatch) {
                            computerMove()
                            break
                        }

                        const isCorrect: boolean = await !!isCorrectMove(compSelected, compNext, board.game.board, 'b', 2, isBlackCheck || isWhiteCheck || false, possibleWBlackMoves, possibleWhiteMoves, countPossibleMovements, board.game.players)
                        if (isCorrect) {
                            console.log('move')
                            
                            await addMove(0, compSelected, compNext)
                            break
                        }
                    } else {
                        
                        computerMove()
                        break
                    }
    
                }
            }
        }
        computerMove()

    }, [board.game.turn])

    useEffect(() => {

        countPossibleMovements(board.game)

    }, [board.game.turn])

    return (
        <Fragment>
            
            
            
            <div className="fields">
                {
                    board.game && board.game.finished && <div className="play-next"><span onClick={e=> initGame([auth.user._id, "b"])}>play next</span></div>
                }
                {
                    board.game && board.game.board && board.game.board.map((field: any, index: number) => <Field key={index} index={index} field={field} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} dangerous={dangerous} setDangerous={setDangerous} isBlackCheck={isBlackCheck} isWhiteCheck={isWhiteCheck} possibleWhiteMoves={possibleWhiteMoves} setPossibleWhiteMoves={setPossibleWhiteMoves} possibleWBlackMoves={possibleWBlackMoves} setPossibleBlackMoves={setPossibleBlackMoves} countPossibleMovements={countPossibleMovements} game={board.game} />)
                }
                <div className="numbers">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                    <span>6</span><span>7</span><span>8</span>
                </div>
                <div className="letters">
                    <span>A</span><span>B</span><span>C</span><span>D</span><span>E</span>
                    <span>F</span><span>G</span><span>H</span>
                </div>
                <div className="history">
                    {/* {
                        board.game && board.game.history && board.game.history.map((move: any) => <p key={move._id} style={ board.game.history[0]._id === move._id ? { color: 'green', fontWeight: 'bold' } : { color: '#000' } }> { move.prev[0].player === board.game.players[0]._id ? <span>w{move.prev[0].type.charAt(0)}{ letters[(move.next[0].position.x - Math.floor(8 * move.next[0].position.y))]}{move.next[0].position.y + 1}</span> : <span>b{move.prev[0].type.charAt(0)}{ letters[(move.next[0].position.x - Math.floor(8 * move.next[0].position.y))]}{move.next[0].position.y + 1}</span> } </p> )
                    } */}
                </div>
                <div className="turn">
                    {
                        board.game && board.game.turn === 0 ? "white" : "black"
                    }
                </div>
            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    board: state.board,
    auth: state.auth
})
export default connect(mapStateToProps, { initGame, addMove })(withRouter(Board));