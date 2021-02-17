import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { initBoard } from '../store/actions/board/board';
import { getTable } from '../store/actions/table/table';
import Board from './Board';



const Table = ({ match, table, getTable, history, initBoard }: any) => {

    useEffect(() => {
        getTable(match.params.name)
        return () => {
            getTable(match.params.name)
        }
    }, [getTable, match.params.name])


    return (
        <Fragment>
            
            <p>users</p>

            {
                table.table && table.table.users.map((user: any) => table.table.guests.map((guest: any) => <p><span onClick={e=> initBoard(user._id, table.table._id)}>{user.name}</span> <span onClick={e=> initBoard(guest._id, table.table._id)}>{guest.name}</span></p>) )
            }
            {
                table.table && table.table.games.length > 0 ? table.table.games.map((element: any) => <p onClick={e=> history.push(`/tables/${match.params.name}/games/${element._id}`)}>{element._id}</p>) : "Select the player to create the game"
            }
            
            <Switch>
                <Route exact path={`/tables/:name/games/:gameid`} >
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
export default connect(mapStateToProps, { getTable, initBoard })(withRouter(Table));