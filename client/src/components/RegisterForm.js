import { React, useState } from 'react'
import axios from 'axios'
var jwt = require('jsonwebtoken')
const { XIcon } = require('@heroicons/react/outline')

const RegisterForm = ({ userLogin, setRegister }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (
      password.length &&
      confirmPassword.length &&
      username.length &&
      email.length
    ) {
      if (password !== confirmPassword) {
        setLoading(false)
        setError('Password do not match')
        setTimeout(() => {
          setError('')
        }, 5000)
      } else {
        const config = { header: { 'Content-Type': 'application/json' } }

        const result = await axios.post(
          '/api/users/register',
          { email, username, password },
          config
        )
        try {
          if (result.data.error) {
            setLoading(false)
            setError(result.data.message)
            setTimeout(() => {
              setError('')
            }, 5000)
          } else {
            console.log(result.data)
            localStorage.setItem('authToken', result.data.access_token)
            var decode = jwt.decode(result.data.access_token)
            setLoading(false)
            userLogin({ id: decode.id, username: decode.username })
            setRegister(false)
          }
        } catch (err) {
          setLoading(false)
          setError(err.message)
          setTimeout(() => {
            setError('')
          }, 5000)
        }
      }
    } else {
      setLoading(false)
      setError('Please fill up all the form')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }
  return (
    <>
      <div className="absolute right-0 top-0 bottom-0 pt-10 pb-3 px-5 z-50">
        <form class="flex max-w-sm space-x-3">
          <div class="w-full max-w-2xl px-5 py-5 mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
            <div
              className="flex justify-end hover:text-red-500"
              onClick={() => setRegister(false)}
            >
              <XIcon className="h-5 w-5 fill-current" />
            </div>
            <div class="mb-2 text-lg xl:text-2xl px-4 text-center font-bold text-gray-800 dark:text-white">
              <p className="px-2 pt-2">Please fill up the form to register</p>
            </div>
            <div className="flex flex-col justify-around">
              <div class=" mt-2 px-2 ">
                <p className="px-2 pb-2 font-bold">Email</p>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  tabIndex={1}
                  required
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="mt-2 px-2">
                <p className="px-2 pb-2 font-bold">Username</p>
                <input
                  type="text"
                  placeholder="Enter a Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  tabIndex={2}
                  required
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="mt-2 px-2">
                <p className="px-2 pb-2 font-bold">Password</p>
                <input
                  type="password"
                  placeholder="Enter the password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  tabIndex={3}
                  required
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="mt-2 px-2">
                <p className="px-2 pb-2 font-bold">Confirm Password</p>
                <input
                  type="password"
                  placeholder="Confirm the password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  tabIndex={4}
                  required
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="mt-6 mb-2">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  class="py-2 px-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <div
                        style={{ borderTopColor: 'transparent' }}
                        className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                      ></div>
                    </div>
                  ) : error.length ? (
                    <span className="text-white animate-pulse">{error}</span>
                  ) : (
                    'Register'
                  )}
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
