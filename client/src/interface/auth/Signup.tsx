import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup } from '../../store/actions/user/auth';




const Signup = ({ signup, history }: any) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        signup(formData)

    }

    return (
        <Fragment>
            <form className="auth-form" onSubmit={e=> handleSubmit(e)}>
                <h1>Sign up</h1>
                <label htmlFor="name" className="input-label">
                    <span>Name</span>
                    <input type="text" name="name" onChange={e=> handleChange(e)} />
                </label>
                <label htmlFor="email" className="input-label">
                    <span>E-mail address</span>
                    <input type="text" name="email" onChange={e=> handleChange(e)} />
                </label>
                <label htmlFor="password" className="input-label">
                    <span>Password</span>
                    <input type="password" name="password" onChange={e=> handleChange(e)} />
                </label>
                <label htmlFor="passwordConfirm" className="input-label">
                    <span>Confirm password</span>
                    <input type="password" name="passwordConfirm" onChange={e=> handleChange(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">sign up</button>

                </div>

                <button type="button" onClick={e=> history.push('/login')}>Log in</button>
                <button type="button" onClick={e=> history.push('/')}>Join as a guest</button>
            </form>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { signup })(withRouter(Signup));