import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
  let history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/')
    }
  }, [])

  const loginHandler = async (e) => {
    e.preventDefault()

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

      localStorage.setItem('authToken', data.token)

      history.push('/home')
    } catch (error) {
      console.log(error)
      setError(error.response.data.error)
      setTimeout(() => {
        setError('')
      }, 10000)
    }
  }
  console.log(error)
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={loginHandler}>
        <h3 className="text-2xl">Login</h3>
        {error && (
          <span className="bg-red-800 px-4 py-2 bg-opacity-50">{error}</span>
        )}
        <div className="flex flex-col justify-around">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
            className="w-full mb-1 px-5 py-4 shadow border border-b border-black"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password: <Link to="/forgotpassword">Forgot Password?</Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
            className="w-full mb-1 px-5 py-4 shadow border border-b border-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-300 w-full flex items-center justify-center p-4"
        >
          Login
        </button>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
