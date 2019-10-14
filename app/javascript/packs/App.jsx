import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './Home'
import Admin from './admin/Admin'
import Layout from './Layout'

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  </Router>
)

export default App
