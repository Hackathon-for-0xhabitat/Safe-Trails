import {React, useState } from 'react'
import  {BrowserRouter as Link} from 'react-router-dom'


const RegisterForm = () =>{
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (event) => event.preventDefault();
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);}
    const handleChangePassword = (event) => {
        setPassword(event.target.value) }
    const handleChangeRepeatPassword = (event) => {
        setRepeatPassword(event.target.value)}

    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1 >Register</h1>
                    <hr />
                        <label for="email">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            id="email"
                            onChange={handleChangeEmail}
                        />

                        <label for='psw'>Password</label>
                        <input
                            type='password'
                            palceholder='Enter the password'
                            name='psw'
                            value={password}
                            id='psw'
                            onChange={handleChangePassword}
                        />

                        <label for="psw-repeat"><b>Repeat Password</b></label>
                        <input 
                            type="password" 
                            placeholder="Repeat Password"
                            name="psw-repeat"
                            value={repeatPassword}
                            id="psw-repeat"
                            onChange={handleChangeRepeatPassword}
                        />
                        
                    <hr />
                        <button type="submit" class="registerbtn" >Register</button>
                </div>
                <div>
                        Do you have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )

}

export default RegisterForm
