import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { initBoard } from '../store/actions/board/board';
import { setPlayer, deleteTable, getTable, leaveFromTable } from '../store/actions/table/table';
import Board from './Board';
import io from 'socket.io-client';


let socket: any;
const Table = ({ match, table, getTable, history, initBoard, deleteTable, leaveFromTable, auth, setPlayer }: any) => {

    let connection: any

    useEffect(() => {
        getTable(match.params.id)

        socket = io("http://localhost:3000")

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


    
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (table.table.players.length === 2) {
            initBoard(table.table.players, table.table)

        }

    }

    return (
        <Fragment>
            
            <p>users</p>

            {
                table.table && table.table.users.length > 0 && table.table.users.map((user: any) => <p key={user._id} ><span >{user.name} {user._id === auth.user._id && "(You)"}</span> </p>)
            }

            {
                table.table && table.table.games.length > 0 ? table.table.games.map((element: any, index: number) => <p key={element._id} onClick={e=> history.push(`/tables/${match.params.id}/games/${element._id}`)}># {index + 1}: {element.finished ? "score" : "Not finished"}</p>) : "Start the first game"
            }
            
            
            
            <Switch>
                <Route exact path={`/tables/:id`} >
                    <form className="players" onSubmit={e=> handleSubmit(e)}>
                        <button type="button" onClick={e=>setPlayer(match.params.id, 1)}>{ table.table && table.table.players[0] ? table.table.players[0] : "# 1. white"}</button>
                        <button type="button" onClick={e=>setPlayer(match.params.id, 2)}>{ table.table && table.table.players[1] ? table.table.players[1] : "# 2. black"}</button>
                        <button type="submit" >START</button>
                    </form>
                    
                </Route>
                <Route exact path={`/tables/:id/games/:gameid`} >
                    {
                        table.table && <Board table={table} socket={socket} />
                    }
                    
                </Route>
            </Switch>

        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    table: state.table,
    auth: state.auth
})
export default connect(mapStateToProps, { getTable, initBoard, deleteTable, leaveFromTable, setPlayer })(withRouter(Table));