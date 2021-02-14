import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../store/actions/user/auth';




const Login = ({ login, history }: any) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        login(formData)

    }

    return (
        <Fragment>
            <form className="auth-form" onSubmit={e=> handleSubmit(e)}>
                <h1>Log in</h1>

                <label htmlFor="email" className="input-label">
                    <span>E-mail address</span>
                    <input type="text" name="email" onChange={e=> handleChange(e)} />
                </label>
                <label htmlFor="password" className="input-label">
                    <span>Password</span>
                    <input type="password" name="password" onChange={e=> handleChange(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">log in</button>

                </div>
                <button type="button" onClick={e=> history.push('/signup')}>Create account</button>
                <button type="button" onClick={e=> history.push('/')}>Join as a guest</button>
            </form>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { login })(withRouter(Login));