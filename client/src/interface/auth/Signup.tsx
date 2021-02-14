import React, { Fragment, useState } from 'react';




const Signup = () => {

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

        

    }

    return (
        <Fragment>
            <form className="auth-form">
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

                <button type="button">Log in</button>
                <button type="button">Join as a guest</button>
            </form>
        </Fragment>
    );
}
export default Signup;