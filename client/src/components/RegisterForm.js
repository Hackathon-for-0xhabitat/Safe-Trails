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
    return (
        <>
         <div className=  "absolute right-0 top-0 bottom-0 h-full pt-10 pb-3 px-5 z-50" >
           <form class="flex h-full max-w-sm space-x-3">
             <div class="w-full max-w-2xl px-5 py-5 mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
                 <div className="flex justify-end ">
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 "
                     viewBox="0 0 20 20"
                     fill="currentColor"
                   >
                     <path
                       fillRule="evenodd"
                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                       clipRule="evenodd"
                     />
                   </svg>
                 </div>
                 <div class="mb-6 text-3xl font-light text-center font-bold text-gray-800 dark:text-white">
                   Please Register
                 </div>
                 <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                   <div class="col-span-2 lg:col-span-2">
                     <div class=" relative mt-5">
                     <input
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            id="email"
                            onChange={handleChangeEmail}
                            tabIndex={1}
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-11/12 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                     </div>
                   </div>
                   <div class="col-span-2 lg:col-span-2">
                     <div class=" relative mt-5">
                     <input
                            type="text"
                            placeholder="Enter a Username"
                            name="username"
                            value={username}
                            id="username"
                            onChange={handleChangeUsername}
                            tabIndex={2}
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-11/12 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                     </div>
                   </div>
                   <div class="col-span-2 lg:col-span-2">
                     <div class=" relative mt-2 ">
                     <input
                            type='password'
                            palceholder='Enter the password'
                            name='psw'
                            value={password }
                            id='psw'
                            onChange={handleChangePassword}
                            tabIndex={3}
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-11/12 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                     </div>
                   </div>
     
                   <div class="col-span-2 text-right m-3">
                     <button
                        type="submit" 
                        onClick={handleSubmit}
                       class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                       Register
                     </button>
                   </div>
                 </div>
               </div>
             </form>
           </div>
           <div className="w-screen h-screen bg-black bg-opacity-10 absolute z-10 top-0"></div>
         </>
       )


}

export default RegisterForm
