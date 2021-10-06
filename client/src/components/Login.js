import { BrowserRouter as Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const { XIcon } = require('@heroicons/react/outline')
const jwt = require('jsonwebtoken')

const Login = ({ userLogin, loginCloseHandler, setRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loginSubmit = async (e) => {
    e.preventDefault()
    if (email.length && password.length) {
      setLoading(true)
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      try {
        const { data } = await axios.post(
          '/auth/login',
          { email, password },
          config
        )
        localStorage.setItem('authToken', data.access_token)
        var decode = jwt.decode(data.access_token)
        userLogin({ id: decode.id, username: decode.username })
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError('Wrong credentials')
        setTimeout(() => {
          setError('')
        }, 5000)
      }
    } else {
      setError('Please fill in your details to Login')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const loginClosed = () => {
    loginCloseHandler(true)
  }
  const handleRegister = () => {
    loginCloseHandler(true)
    setRegister(true)
  }
  return (
    <>
      <div className="absolute right-0 top-0 pt-10 pb-3 px-5 z-50">
        <form className=" flex max-w-sm space-x-3">
          <div className="w-full max-w-2xl px-5 py-5 mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
            <div
              className="flex justify-end hover:text-red-500"
              onClick={loginClosed}
            >
              <XIcon className="h-5 w-5 fill-current" />
            </div>
            <div className="mb-2 text-xl font-light text-center font-bold text-gray-800 dark:text-white">
              <p className="px-2 pt-2">
                To report an issue, please Login into your account
              </p>
            </div>
            <div className="flex flex-col justify-around">
              <div className="mb-6">
                <div class=" mt-2 px-2 ">
                  <p className="px-2 pb-2 font-bold">Email</p>
                  <input
                    type="email"
                    id="contact-form-name"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mt-2 px-2">
                  <p className="px-2 pb-2 font-bold">Password</p>
                  <input
                    required
                    type="password"
                    id="contact-form-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </div>
              <div className="mb-2">
                <button
                  type="submit"
                  onClick={loginSubmit}
                  className="py-2 px-4 bg-red-400 hover:bg-red-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
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
                    'Login'
                  )}
                </button>
                <p className="text-center py-3 text-sm font-bold">or</p>
                <Link to="/register">
                  <button
                    onClick={() => handleRegister()}
                    className="py-2 px-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className=" w-screen h-screen bg-black transition duration-100 bg-opacity-20 absolute z-10 top-0"></div>
    </>
  )
}

export default Login
