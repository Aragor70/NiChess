import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTables, joinToTable } from '../store/actions/table/table';
import Table from './Table';

import guestAvatar from '../style/icons/Roblox_guest.png'


const Tables = ({ table, getTables, history, joinToTable }: any) => {

    useEffect(() => {
        getTables()

        return () => {
            getTables()
        }
    }, [getTables])

    console.log(table)

    return (
        <Fragment>
            

            <p><b>Tables</b></p>
            <div className="table-list">
                {
                    table.tables.map((element: any, index: number) => <p key={element._id}><span onClick={e=> joinToTable(element._id, history)}>{index + 1}. {element.name}</span> : <span>{element.users.map( (user: any) => <img src={user.role === 'User' ? user.avatar : guestAvatar} />)}</span></p>)
                }
            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    table: state.table
})
export default connect(mapStateToProps, { getTables, joinToTable })(withRouter(Tables));