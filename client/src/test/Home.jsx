import { Router } from 'express'
import Login from './Login'

const Home = () => {
  return (
    <div>
      <Router>
        <Login />
      </Router>
    </div>
  )
}

export default Home
