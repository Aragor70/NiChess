import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { initBoard } from '../store/actions/board/board';
import { setPlayer, deleteTable, getTable, leaveFromTable } from '../store/actions/table/table';
import Board from './Board';



const Table = ({ match, table, getTable, history, initBoard, deleteTable, leaveFromTable, auth, setPlayer }: any) => {

    useEffect(() => {
        getTable(match.params.id)
        return () => {
            getTable(match.params.id)
            
            leaveFromTable(match.params.id, history)
            
        }
    }, [getTable, match.params.id])


    return (
        <Fragment>
            
            <p>users</p>

            {
                table.table && table.table.users.length > 0 && table.table.users.map((user: any) => <p key={user._id} ><span onClick={e=> initBoard([user._id, auth.user._id] , table.table)}>user: {user.name} {user._id === auth.user._id && "(You)"}</span> </p>)
            }

            {
                table.table && table.table.games.length > 0 ? table.table.games.map((element: any) => <p key={element._id} onClick={e=> history.push(`/tables/${match.params.id}/games/${element._id}`)}>game number: {element._id}</p>) : "Select the player to create the game"
            }

            <div className="players">
                <button onClick={e=>setPlayer(match.params.id, 1)}>{ table.table && table.table.players[0] ? table.table.players[0] : "# 1. white"}</button>
                <button onClick={e=>setPlayer(match.params.id, 2)}>{ table.table && table.table.players[1] ? table.table.players[1] : "# 2. black"}</button>
            </div>
            
            <Switch>
                <Route exact path={`/tables/:id/games/:gameid`} >
                    {
                        table.table && <Board table={table} />
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