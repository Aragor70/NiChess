import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initGame } from '../../store/actions/single/board';
import Field from './Field';



const Board = ({ board, auth, initGame }: any) => {

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
    
    return (
        <Fragment>
            
            
            
            <div className="fields">
                {
                    board.game && board.game.finished && <div className="play-next"><span onClick={e=> initGame([auth.user._id, "b"])}>play next</span></div>
                }
                {
                    board.game && board.game.board && board.game.board.map((field: any, index: number) => <Field key={index} index={index} field={field} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} dangerous={dangerous} setDangerous={setDangerous} />)
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
                    {
                        board.game && board.game.history && board.game.history.map((move: any) => <p key={move._id} style={ board.game.history[0]._id === move._id ? { color: 'green', fontWeight: 'bold' } : { color: '#000' } }> { move.prev[0].player === board.game.players[0]._id ? <span>w{move.prev[0].type.charAt(0)}{ letters[(move.next[0].position.x - Math.floor(8 * move.next[0].position.y))]}{move.next[0].position.y + 1}</span> : <span>b{move.prev[0].type.charAt(0)}{ letters[(move.next[0].position.x - Math.floor(8 * move.next[0].position.y))]}{move.next[0].position.y + 1}</span> } </p> )
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
export default connect(mapStateToProps, { initGame })(withRouter(Board));