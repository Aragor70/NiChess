import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTable } from '../store/actions/table/table';




const Table = ({ match, table, getTable }: any) => {

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
                table.table && table.table.users.map((user: any) => table.table.guests.map((guest: any) => <p>{user.name} {guest.name}</p>) )
            }



        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    table: state.table
})
export default connect(mapStateToProps, { getTable })(withRouter(Table));