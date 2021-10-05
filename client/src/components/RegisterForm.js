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
        <div className=  "absolute right-0 top-0 bottom-0 h-full pt-10 pb-3 px-5 z-50">
            <form  class="flex h-full max-w-sm space-x-3">
                
                    <h3 className="text-2xl">Register</h3>
                    <div className="flex flex-col justify-around">
                        <label for="email">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            id="email"
                            onChange={handleChangeEmail}
                            tabIndex={1}
                            className="w-full mb-1 px-5 py-4 shadow border border-b border-black"
                        />
                    </div>
                        <label for="username">Username</label>
                        <input
                            type="text"
                            placeholder="Enter a Username"
                            name="username"
                            value={username}
                            id="username"
                            onChange={handleChangeUsername}
                            tabIndex={2}
                            className="w-full mb-1 px-5 py-4 shadow border border-b border-black"
                        />

                        <label for='psw'>Password</label>
                        <input
                            type='password'
                            palceholder='Enter the password'
                            name='psw'
                            value={password }
                            id='psw'
                            onChange={handleChangePassword}
                            tabIndex={3}
                            className="w-full mb-1 px-5 py-4 shadow border border-b border-black"
                        />
                        
                    
                        <button
                         type="submit" 
                         class="registerbtn"
                         onClick={handleSubmit}
                         className="bg-blue-500 hover:bg-blue-300 w-full flex items-center justify-center p-4"
                        >
                        Register
                        </button>
                
                <div>
                        Do you have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )

}

export default RegisterForm
