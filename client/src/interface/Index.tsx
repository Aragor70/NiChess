import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createTable } from '../store/actions/table/table';
import Tables from './Tables';




const Index = ({ auth, history, createTable }: any) => {

    const [createView, setCreateView] = useState(false)

    const [formData, setFormData] = useState({
        name: ''
    }) 
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const handleSubmit = (e: any) => {
        e.preventDefault();

        createTable(formData, history)
    }

    return (
        <Fragment>
            <p>You are logged in.</p>

            <button onClick={e=> setCreateView(!createView)}>create new table</button>

            {
                createView && <Fragment>
                    <form onSubmit={e=> handleSubmit(e)}>
                        <input type="text" name="name" onChange={e=> handleChange(e)} />
                        <button type="submit">Create</button>
                    </form>
                </Fragment>
            }

            <Tables />


        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { createTable })(withRouter(Index));