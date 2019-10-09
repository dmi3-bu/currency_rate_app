import React from 'react'
// import 'src/css/cssindex.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import Admin from './Admin'

const App = () => (
  <Router>
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
)

export default App
