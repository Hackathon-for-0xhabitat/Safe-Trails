import {React, useState } from 'react'
import  {BrowserRouter as Link} from 'react-router-dom'
import axios from 'axios'


const RegisterForm = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const handleChangeEmail = (event) => {
        setEmail(event.target.value);}
    const handleChangePassword = (event) => {
        setPassword(event.target.value) }
    const handleChangeUsername = (event) => {
        setUsername(event.target.value) }

      const handleSubmit = () => {
        const loginFormData = new FormData();
        loginFormData.append("email", email)
        loginFormData.append("username", username)
        loginFormData.append("password", password)

        const config = { header: { 'Content-Type': 'application/json'} }
        
        axios(( '/api/users/register', { email, username, password }, config )
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            console.log(err)
        })
        )
    }

        

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Register</h1>
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
                    <hr />
                        <label for="username">Username</label>
                        <input
                            type="text"
                            placeholder="Enter a Username"
                            name="username"
                            value={username}
                            id="username"
                            onChange={handleChangeUsername}
                        />

                        <label for='psw'>Password</label>
                        <input
                            type='password'
                            palceholder='Enter the password'
                            name='psw'
                            value={password }
                            id='psw'
                            onChange={handleChangePassword}
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
