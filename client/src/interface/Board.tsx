import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getGame, initBoard } from '../store/actions/board/board';
import Field from './Field';



const Board = ({ board, initBoard, table, match, getGame }: any) => {


    const [selectedData, setSelectedData] = useState<any>(null)
//opponentid, tableid
    useEffect(() => {
        getGame(match.params.gameid)

        return () => {
            getGame(match.params.gameid)
        }
    }, [getGame])

    
    const [moved, setMoved] = useState(false)

    console.log(board.fields)
    return (
        <Fragment>
            
            <div className="fields">
                {
                    board.game && board.game.board.map((field: any, index: number) => <Field key={index} index={index} field={field} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} />)
                }
                
            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    board: state.board,
    auth: state.auth
})
export default connect(mapStateToProps, { initBoard, getGame })(withRouter(Board));