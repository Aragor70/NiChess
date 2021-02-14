import React, { Fragment, useState } from 'react';




const Login = () => {

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



    }

    return (
        <Fragment>
            <form className="auth-form">
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
                <button type="button">Create account</button>
                <button type="button">Join as a guest</button>
            </form>
        </Fragment>
    );
}
export default Login;