import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'

const Home = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/">
            <div>Hello</div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default Home
