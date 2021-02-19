import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { initBoard } from '../store/actions/board/board';
import { deleteTable, getTable, leaveFromTable } from '../store/actions/table/table';
import Board from './Board';



const Table = ({ match, table, getTable, history, initBoard, deleteTable, leaveFromTable }: any) => {

    useEffect(() => {
        getTable(match.params.id)
        return () => {
            getTable(match.params.id)
            
            leaveFromTable(match.params.id, history)
            
        }
    }, [getTable, match.params.name])


    return (
        <Fragment>
            
            <p>users</p>

            {
                table.table && table.table.users.map((user: any) => <p key={user._id} ><span onClick={e=> initBoard(user._id, table.table)}>user: {user.name}</span> </p>)
            }
            {
                table.table && table.table.guests.map((guest: any) => <p key={guest._id}><span onClick={e=> initBoard(guest._id, table.table)}>guest: {guest.name}</span> </p>)
            
            }

            {
                table.table && table.table.games.length > 0 ? table.table.games.map((element: any) => <p key={element._id} onClick={e=> history.push(`/tables/${match.params.id}/games/${element._id}`)}>game number: {element._id}</p>) : "Select the player to create the game"
            }
            
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
    table: state.table
})
export default connect(mapStateToProps, { getTable, initBoard, deleteTable, leaveFromTable })(withRouter(Table));