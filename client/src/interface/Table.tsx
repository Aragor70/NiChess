import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { initBoard, surrender, draw } from '../store/actions/board/board';
import { setPlayer, deleteTable, getTable, leaveFromTable } from '../store/actions/table/table';
import Board from './Board';
import io from 'socket.io-client';


let socket: any;
const Table = ({ match, table, getTable, history, initBoard, deleteTable, leaveFromTable, auth, setPlayer, board, draw, surrender, toggleConfig, setToggleConfig }: any) => {

    let connection: any

    useEffect(() => {
        getTable(match.params.id)

        socket = io("https://nichess.herokuapp.com")

        connection = setInterval(() => console.log('I am running'), 10000)

        socket.emit('join', { uid: auth.user._id, tableId: match.params.id }, () => {
            console.log('Socket client logged in')
        })
        

        return () => {
            getTable(match.params.id)
            
            leaveFromTable(match.params.id, history)
            
            socket.disconnect()
            socket.off()
            clearInterval(connection)

            console.log('disconnected now')
        }
    }, [getTable, match.params.id])

    useEffect(() => {
        if (table.table.games && table.table.games.length > 0) {
            table.table.games && history.push(`/tables/${match.params.id}/games/${table.table.games[table.table.games.length - 1]._id}`)
        }
    }, [table.table.games])
    
    useEffect(() => {
        if (socket) {
            socket.on('option', (msg: any) => {

                getTable(match.params.id)
                console.log('reload table')
            })
            
        }
    }, [socket])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (table.table.players.white && table.table.players.black) {
            initBoard([table.table.players.white, table.table.players.black], table.table)

        }

    }

    
    useEffect(() => {
        getTable(match.params.id)
        
    }, [toggleConfig])

    console.log(table.table.players)
    
    return (
        <Fragment>
            <div className="table-content">
                {
                    toggleConfig && <Fragment>
                        <div className="config-table">
                                        
                            <p><b>{table.table.name}</b></p>
                            <hr />

                            <div className="user-list">
                            {
                                table.table && table.table.users.length > 0 && table.table.users.map((user: any) => <p key={user._id} ><span >{user.name} {user._id === auth.user._id && "(You)"}</span> </p>)
                            }
                            </div>
                            <hr />
                            <div className="game-list">
                            {
                                table.table && table.table.games.length > 0 ? table.table.games.map((element: any, index: number) => <p key={element._id} onClick={e=> history.push(`/tables/${match.params.id}/games/${element._id}`)}># {index + 1}: {element.finished ? <span>{`score: #1. ${element.players[0]} [ ${element.score[0]} ] / [ ${element.score[1]} ] #2. ${element.players[1]}`}</span> : "Not finished"}</p>) : <p>Start the first game</p>
                            }
                            </div>
                            {
                                board.game && !board.game.finished && <Fragment>
                                    <div className="game-options">
                                        <button onClick={e=> draw(board.game._id, socket)}>draw</button>
                                        <button onClick={e=> surrender(board.game._id, socket)}>surrender</button>
                                    </div>
                                </Fragment>
                            }    
                                


                        <Switch>
                            <Route exact path={`/tables/:id`} >
                                
                                <form className="players-form" onSubmit={e=> handleSubmit(e)}>
                                    <button type="button" onClick={e=>setPlayer(match.params.id, 1)}>{ table.table && table.table.players && table.table.players.white ? table.table.players.white.name : "# 1. white"}</button>
                                    <button type="button" onClick={e=>setPlayer(match.params.id, 2)}>{ table.table && table.table.players && table.table.players.black ? table.table.players.black.name : "# 2. black"}</button>
                                    <button type="submit" >START</button>
                                </form>
                                
                            </Route>
                        </Switch>
                            
                        </div>

                    </Fragment>
                }
                    
            <Switch>
                <Route exact path={`/tables/:id/games/:gameid`} >
                    
                    {
                        table.table && <Board table={table} socket={socket} toggleConfig={toggleConfig} setToggleConfig={setToggleConfig} />
                    }
                    
                </Route>
            </Switch>
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    table: state.table,
    auth: state.auth,
    board: state.board
})
export default connect(mapStateToProps, { getTable, initBoard, deleteTable, leaveFromTable, setPlayer, draw, surrender })(withRouter(Table));