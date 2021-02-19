import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createTable } from '../store/actions/table/table';
import Tables from './Tables';




const Index = ({ auth, history, createTable }: any) => {



    return (
        <Fragment>
            <p>You are logged in.</p>

            <button onClick={e=> createTable(history)}>create new table</button>

            <Tables />


        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { createTable })(withRouter(Index));