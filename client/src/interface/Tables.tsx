import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTables } from '../store/actions/table/table';
import Table from './Table';




const Tables = ({ table, getTables, history }: any) => {

    useEffect(() => {
        getTables()

        return () => {
            getTables()
        }
    }, [getTables])

    console.log(table)

    return (
        <Fragment>
            

            <p>Tables</p>

            {
                table.tables.map((element: any) => <p onClick={e=> history.push(`/tables/${element._id}`)}>{element.name}</p>)
            }

            



        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    table: state.table
})
export default connect(mapStateToProps, { getTables })(withRouter(Tables));